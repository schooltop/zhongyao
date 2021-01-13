class Work::EfficaciesController < Admin::BaseController
  before_action :set_efficacy, only: [:show, :edit, :update, :destroy]

  # GET /efficacies
  # GET /efficacies.json
  def index
    @q = SearchParams.new(params[:search_params] || {})
    search_params = @q.attributes(self)
    @efficacies = Efficacy.default_where(search_params).page(params[:page]).per(10)
  end

  # GET /efficacies/1
  # GET /efficacies/1.json
  def show
    # 医药
    @medicines = MedicineEfficacy.where(efficacy_id: @efficacy.id)
  end

  # GET /efficacies/new
  def new
    @efficacy = Efficacy.new
  end

  # GET /efficacies/1/edit
  def edit
  end

  # POST /efficacies
  # POST /efficacies.json
  def create
    @efficacy = Efficacy.create(efficacy_params)
  end

  # PATCH/PUT /efficacies/1
  # PATCH/PUT /efficacies/1.json
  def update
    @efficacy.update(efficacy_params)
  end

  # DELETE /efficacies/1
  # DELETE /efficacies/1.json
  def destroy
    @efficacy.destroy
    respond_to do |format|
      format.html { redirect_to efficacies_url, notice: 'Efficacy was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_efficacy
      @efficacy = Efficacy.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def efficacy_params
      params.require(:efficacy).permit(:name)
    end
end
