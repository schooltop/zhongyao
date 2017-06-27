class Work::AliasNamesController < Admin::BaseController
  before_action :set_alias_name, only: [:show, :edit, :update, :destroy]

  # GET /alias_names
  # GET /alias_names.json
  def index
    @q = SearchParams.new(params[:search_params] || {})
    search_params = @q.attributes(self)
    @alias_names = AliasName.default_where(search_params).page(params[:page]).per(10)
  end

  # GET /alias_names/1
  # GET /alias_names/1.json
  def show
  end

  # GET /alias_names/new
  def new
    @alias_name = AliasName.new
  end

  # GET /alias_names/1/edit
  def edit
  end

  # POST /alias_names
  # POST /alias_names.json
  def create
    @alias_name = AliasName.new(alias_name_params)

    respond_to do |format|
      if @alias_name.save
        format.html { redirect_to @alias_name, notice: 'Alias name was successfully created.' }
        format.json { render :show, status: :created, location: @alias_name }
      else
        format.html { render :new }
        format.json { render json: @alias_name.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /alias_names/1
  # PATCH/PUT /alias_names/1.json
  def update
    respond_to do |format|
      if @alias_name.update(alias_name_params)
        format.html { redirect_to @alias_name, notice: 'Alias name was successfully updated.' }
        format.json { render :show, status: :ok, location: @alias_name }
      else
        format.html { render :edit }
        format.json { render json: @alias_name.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /alias_names/1
  # DELETE /alias_names/1.json
  def destroy
    @alias_name.destroy
    respond_to do |format|
      format.html { redirect_to alias_names_url, notice: 'Alias name was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_alias_name
      @alias_name = AliasName.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def alias_name_params
      params.fetch(:alias_name, {})
    end
end
