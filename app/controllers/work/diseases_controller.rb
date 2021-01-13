class Work::DiseasesController < Admin::BaseController
  before_action :set_disease, only: [:show, :edit, :update, :destroy]

  # GET /diseases
  # GET /diseases.json
  def index
    @q = SearchParams.new(params[:search_params] || {})
    search_params = @q.attributes(self)
    @diseases = Disease.default_where(search_params).page(params[:page]).per(10)
  end

  # GET /diseases/1
  # GET /diseases/1.json
  def show
    # 药物
    @medicines = MedicineDisease.where(disease_id: @disease.id)
    # 药方
    @prescriptions = PrescriptionDisease.where(disease_id: @disease.id)
  end

  # GET /diseases/new
  def new
    @disease = Disease.new
  end

  # GET /diseases/1/edit
  def edit
  end

  # POST /diseases
  # POST /diseases.json
  def create
    @disease = Disease.create(disease_params)
  end

  # PATCH/PUT /diseases/1
  # PATCH/PUT /diseases/1.json
  def update
    @disease.update(disease_params)
  end

  # DELETE /diseases/1
  # DELETE /diseases/1.json
  def destroy
    @disease.destroy
    respond_to do |format|
      format.html { redirect_to diseases_url, notice: 'Disease was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_disease
      @disease = Disease.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def disease_params
      params.require(:disease).permit(:name,
                                     :link,
                                     :latin_name)
    end
end
