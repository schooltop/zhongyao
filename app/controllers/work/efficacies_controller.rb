class Work::EfficaciesController < Admin::BaseController
  before_action :set_efficacy, only: [:show, :edit, :update, :destroy]

  # GET /efficacies
  # GET /efficacies.json
  def index
    @efficacies = Efficacy.all
  end

  # GET /efficacies/1
  # GET /efficacies/1.json
  def show
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
    @efficacy = Efficacy.new(efficacy_params)

    respond_to do |format|
      if @efficacy.save
        format.html { redirect_to @efficacy, notice: 'Efficacy was successfully created.' }
        format.json { render :show, status: :created, location: @efficacy }
      else
        format.html { render :new }
        format.json { render json: @efficacy.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /efficacies/1
  # PATCH/PUT /efficacies/1.json
  def update
    respond_to do |format|
      if @efficacy.update(efficacy_params)
        format.html { redirect_to @efficacy, notice: 'Efficacy was successfully updated.' }
        format.json { render :show, status: :ok, location: @efficacy }
      else
        format.html { render :edit }
        format.json { render json: @efficacy.errors, status: :unprocessable_entity }
      end
    end
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
      params.fetch(:efficacy, {})
    end
end
