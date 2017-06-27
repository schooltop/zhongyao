class Work::PrescriptionDetailsController < Admin::BaseController
  before_action :set_prescription_detail, only: [:show, :edit, :update, :destroy]

  # GET /prescription_details
  # GET /prescription_details.json
  def index
    @prescription_details = PrescriptionDetail.all
  end

  # GET /prescription_details/1
  # GET /prescription_details/1.json
  def show
  end

  # GET /prescription_details/new
  def new
    @prescription_detail = PrescriptionDetail.new
  end

  # GET /prescription_details/1/edit
  def edit
  end

  # POST /prescription_details
  # POST /prescription_details.json
  def create
    @prescription_detail = PrescriptionDetail.new(prescription_detail_params)

    respond_to do |format|
      if @prescription_detail.save
        format.html { redirect_to @prescription_detail, notice: 'Prescription detail was successfully created.' }
        format.json { render :show, status: :created, location: @prescription_detail }
      else
        format.html { render :new }
        format.json { render json: @prescription_detail.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /prescription_details/1
  # PATCH/PUT /prescription_details/1.json
  def update
    respond_to do |format|
      if @prescription_detail.update(prescription_detail_params)
        format.html { redirect_to @prescription_detail, notice: 'Prescription detail was successfully updated.' }
        format.json { render :show, status: :ok, location: @prescription_detail }
      else
        format.html { render :edit }
        format.json { render json: @prescription_detail.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /prescription_details/1
  # DELETE /prescription_details/1.json
  def destroy
    @prescription_detail.destroy
    respond_to do |format|
      format.html { redirect_to prescription_details_url, notice: 'Prescription detail was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_prescription_detail
      @prescription_detail = PrescriptionDetail.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def prescription_detail_params
      params.fetch(:prescription_detail, {})
    end
end
