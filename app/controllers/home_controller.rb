class HomeController < BaseController
  layout 'web_v1'

  def index
    @site_name = "小批量化学品代采代销-网化商城_Whmall.com - whmall.com"
    @description = '网化商城是全球领先的小批量化学品B2B交易平台.以代采代销切入用户需求,提供”找原料”、”卖产品”、”AI路线设计”、”实单竞标”等服务,致力于优化供需资源匹配,加快商品流通速度,营造健康的化学品在线交易生态圈.'
    @keywords = '小批量,小量,化学品,化工,化工原料,化合物,有机合成,定制合成,海外订单,化学试剂,精细化工,医药中间体,化工中间体,CAS,合成路线,代采代销,撮合交易,全品类,B2B,平台'
    #网站banner
    @banner_list = Banner.where(position: :home_page).actived.valid_date.order(seq: :desc, updated_at: :desc )
    # 中间广告位
    @middle_banner = Banner.get_banner_info(:website_home_middle)
    # 特殊品类广告位
    @website_home_special_category = Banner.get_banner_info(:website_home_special_category)
    #网站公告
    @system_notifies =  Article.announcement.actived.order(started_at: :desc,id: :desc).limit 5
    #媒体新闻
    @news_list = Article.news.actived.order(started_at: :desc,id: :desc).limit 2
    # 化学前沿
    @chemical_frontiers = ChemicalFrontiers.order(started_at: :desc,id: :desc).limit 6

    #最新直供厂家 需求规则
    #最近更新驻场品种的6家供应商（驻场产品上线，增加产品或调整价格）

    cache_sum("firstpage")
    cache_array("firstpage_user_uuids",cookies[:opxPID],"uniq")
    cache_array("#{cookies[:opxPID]}_user_tags","firstpage","uniq")
    cache_sum("#{cookies[:opxPID]}_user_firstpage")

    suppliers_a =  AgentChemical.get_suppliers_a
    suppliers_b =  AgentChemical.get_suppliers_b
    @suppliers_c = suppliers_a + suppliers_b
    @suppliers_c = @suppliers_c.sort{|x,y| y[1] <=> x[1]}
    @suppliers_c = @suppliers_c.uniq{|aa| aa[0]}

    @special_vendor_one = Company.special_type_pass.order(updated_at: :desc).page(1).per(4)
    @special_vendor_two = Company.special_type_pass.order(updated_at: :desc).page(2).per(4)
    @special_vendor_three = Company.special_type_pass.order(updated_at: :desc).page(3).per(4)

    @show_advance = false
    if cookies[:double_eleven].blank?
      cookies[:double_eleven] =  { :value => 'double_eleven', :expires => 20.day.from_now }
      @show_advance = true
    end

  end

  # chemical_ai跳转
  def chemical_ai
    tracking_hash = {}
    tracking_hash[:opxPID] = cookies[:opxPID]
    # 宿主网站cookie
    tracking_hash[:time_now] = Time.now.strftime("%Y-%m-%d %H:%M:%S")
    tracking_hash[:domain] = request.raw_host_with_port
    tracking_hash[:opxtitle] = "网化chemical_ai"
    tracking_hash[:opxreferrer] = request.referer
    tracking_hash[:opxurl] = "/chemical_ai"
    tracking_hash[:opxid] = current_user&.id.to_i
    tracking_hash[:ip] = (request.env['HTTP_X_FORWARDED_FOR'].present? ? request.env['HTTP_X_FORWARDED_FOR'] : request.remote_ip).split(",").first
    tracking_hash[:opxuserAgent] = ""

    # 统计游客url浏览记录
    cache_array("#{cookies[:opxPID]}_user_url_list",tracking_hash)
    cache_sum("#{cookies[:opxPID]}_user_uuids")

    unless cache_read("user_uuids_list") && (cache_read("user_uuids_list").include? cookies[:opxPID])
      # uuids数统计加1
      cache_sum("user_uuids")
      # 首次登录信息
      cache_value("#{cookies[:opxPID]}_user_message",tracking_hash)
    end

    # uuid添加进数组
    cache_array("user_uuids_list",cookies[:opxPID],"uniq")

    # 当前用户关联
    if current_user
      cache_value(cookies[:opxPID],current_user&.id.to_i)
    end

    # 客户首页访问tag纪录
    cache_sum("chemical_ai")
    cache_array("chemical_ai_user_uuids",cookies[:opxPID],"uniq")
    cache_array("#{cookies[:opxPID]}_user_tags","chemical_ai","uniq")
    cache_sum("#{cookies[:opxPID]}_user_chemical_ai")

    redirect_to "http://www.chemical.ai"
  end


  # 设置右边的菜单是否显示大菜单
  def set_right_menu
    if params[:show_right_menu].present?
      session[:show_right_menu] = true
    else
      session.delete :show_right_menu
    end
    render_success
  end
  def add_customer_bug
      other_params = {
          user_id: current_user.blank? ? -1 : current_user.id,
      }
      CustomerBug.create(customer_bug_params.merge(other_params))
      render_success
  end

  def refresh_head
  end

  def render_success(msg = nil, data = {})
    render :json => {
        success: true,
        message: msg.to_s
    }.merge(data)
  end

  def render_fail(msg = nil, data = {})
    render :json => {
        success: false,
        message: msg.to_s
    }.merge(data)
  end

  def attention_chemical
    if current_user.blank?
      render_fail('!', errors: { code: 'NOT_LOGIN'} )
    else
      my_attention = MyAttention.find_by(user_id: current_user.id, chemical_id: params[:chemical_id])
      if my_attention.present?
        my_attention.destroy
        render_fail
      else
        MyAttention.create(user_id: current_user.id, chemical_id: params[:chemical_id], attention_origin: params[:origin])
        render_success
      end
    end
  end

  def validate_certificate_no
    category = params[:category].to_i
    no = params[:no]
    if [8110, 8113, 8109].include?(category) && no.present?
      cf = Certificate.where(category: [8110, 8113, 8109]).find_by(no: no)
      if cf.present?
        render_fail
      else
        render_success
      end
    else
      render_success
    end
  end
  private
  def customer_bug_params
    params.require(:customer_bug).permit(:content, :contact_style)
  end

end
