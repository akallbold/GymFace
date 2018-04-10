class KlassesController < ApplicationController

  def index
    if params[:date] != "undefined"
      Klass.fetchKlasses(params[:date])
      @klasses = Klass.class_by_date(params[:date])
      render json: @klasses, status: 200
    else
      Klass.fetchKlasses()
      @klasses = Klass.class_by_date()
      render json: @klasses, status: 200
    end
  end


end
