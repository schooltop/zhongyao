class Work::PrescriptionsController < Admin::BaseController
  before_action :set_prescription, only: [:show, :edit, :update, :destroy]

  # GET /prescriptions
  # GET /prescriptions.json
  def index
    @q = SearchParams.new(params[:search_params] || {})
    search_params = @q.attributes(self)
    @prescriptions = Prescription.default_where(search_params).page(params[:page]).per(10)
  end

  # GET /prescriptions/1
  # GET /prescriptions/1.json
  def show
  end

  # GET /prescriptions/new
  def new
    @prescription = Prescription.new
  end

  # GET /prescriptions/1/edit
  def edit
  end

  # POST /prescriptions
  # POST /prescriptions.json
  def create
    @prescription = Prescription.create(prescription_params.merge(user_id:current_user.id))
    
    diseases_lists = prescription_params[:diseases_list].split(",")
    diseases_lists.each do |disease_name|
      disease = Disease.find_or_create_by(name:disease_name)
      PrescriptionDisease.find_or_create_by(prescription_id: @prescription.id, disease_id: disease.id)
    end

    details = prescription_params[:detail].split(",")
    details.each do |de|
      package = de.split(":")
      medicine = Medicine.find_or_create_by(name:package.first)
      detail = PrescriptionDetail.find_or_create_by(prescription_id:@prescription.id,medicine_id:medicine.id)
      detail.package_info = package.last
      detail.save
    end

  end

  # PATCH/PUT /prescriptions/1
  # PATCH/PUT /prescriptions/1.json
  def update
    @prescription.update(prescription_params)

    diseases_lists = prescription_params[:diseases_list].split(",")
    diseases_lists.each do |disease_name|
      disease = Disease.find_or_create_by(name:disease_name)
      PrescriptionDisease.find_or_create_by(prescription_id: @prescription.id, disease_id: disease.id)
    end

    details = prescription_params[:detail].split(",")
    details.each do |de|
      package = de.split(":")
      medicine = Medicine.find_or_create_by(name:package.first)
      detail = PrescriptionDetail.find_or_create_by(prescription_id:@prescription.id,medicine_id:medicine.id)
      detail.package_info = package.last
      detail.save
    end
  end

  # DELETE /prescriptions/1
  # DELETE /prescriptions/1.json
  def destroy
    @prescription.destroy
    respond_to do |format|
      format.html { redirect_to prescriptions_url, notice: 'Prescription was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_prescription
      @prescription = Prescription.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def prescription_params
      params.require(:prescription).permit(:name,
                                     :diseases_list,
                                     :detail,
                                     :note,
                                     :user_id)
    end
end
