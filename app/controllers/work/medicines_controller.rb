class Work::MedicinesController < Admin::BaseController
  before_action :set_medicine, only: [:show, :edit, :update, :destroy]

  # GET /medicines
  # GET /medicines.json
  def index
    @q = SearchParams.new(params[:search_params] || {})
    search_params = @q.attributes(self)
    @medicines = Medicine.default_where(search_params).page(params[:page]).per(10)
  end

  # GET /medicines/1
  # GET /medicines/1.json
  def show
    # 疾病
    @diseases = MedicineDisease.where(medicine_id: @medicine.id)
    # 药效
    @efficacies = MedicineEfficacy.where(medicine_id: @medicine.id)
    # 药方
    @prescriptions = PrescriptionDetail.where(medicine_id: @medicine.id)
  end

  # GET /medicines/new
  def new
    @medicine = Medicine.new
  end

  # GET /medicines/1/edit
  def edit
  end

  # POST /medicines
  # POST /medicines.json
  def create
    @medicine = Medicine.create(medicine_params)

    diseases_lists = medicine_params[:diseases_list].split(",")
    diseases_lists.each do |disease_name|
      disease = Disease.find_or_create_by(name:disease_name)
      MedicineDisease.find_or_create_by(medicine_id: @medicine.id, disease_id: disease.id)
    end

    efficacie_lists = medicine_params[:efficacie_list].split(",")
    efficacie_lists.each do |efficacy_name|
      efficacy = Efficacy.find_or_create_by(name:efficacy_name)
      MedicineEfficacy.find_or_create_by(medicine_id: @medicine.id, efficacy_id: efficacy.id)
    end

  end

  # PATCH/PUT /medicines/1
  # PATCH/PUT /medicines/1.json
  def update
    @medicine.update(medicine_params)

    diseases_lists = medicine_params[:diseases_list].split(",")
    diseases_lists.each do |disease_name|
      disease = Disease.find_or_create_by(name:disease_name)
      MedicineDisease.find_or_create_by(medicine_id: @medicine.id, disease_id: disease.id)
    end

    efficacie_lists = medicine_params[:efficacie_list].split(",")
    efficacie_lists.each do |efficacy_name|
      efficacy = Efficacy.find_or_create_by(name:efficacy_name)
      MedicineEfficacy.find_or_create_by(medicine_id: @medicine.id, efficacy_id: efficacy.id)
    end

  end

  # DELETE /medicines/1
  # DELETE /medicines/1.json
  def destroy
    @medicine.destroy
    respond_to do |format|
      format.html { redirect_to medicines_url, notice: 'Medicine was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_medicine
      @medicine = Medicine.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def medicine_params
      params.require(:medicine).permit(:name,
                                     :other_name,
                                     :diseases_list,
                                     :efficacie_list,
                                     :source,
                                     :resistance,
                                     :indications,
                                     :note)
    end
end
