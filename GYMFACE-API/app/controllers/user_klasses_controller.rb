class UserKlassesController < ApplicationController

  def create
    user = User.find(create_params[:user_id])
    klass = Klass.find(create_params[:klass_id])
    user.klasses << klass

    if user.save
      render json: {message: "Success!"}, status: 200
    else
      render json: {error: "Already have a reservation for this time."}, status: 400
    end
  end

  def destroy
    user = User.find(create_params[:user_id])
    user.klasses.delete(create_params[:klass_id])
    if user.save
      render json: {message: "Success!"}, status: 200
    else
      render json: {error: "Class not removed."}, status: 400
    end
  end

  private

  def create_params
    params.require(:user_klass).permit(:user_id, :klass_id)
  end

end
