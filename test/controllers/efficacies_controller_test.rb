require 'test_helper'

class EfficaciesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @efficacy = efficacies(:one)
  end

  test "should get index" do
    get efficacies_url
    assert_response :success
  end

  test "should get new" do
    get new_efficacy_url
    assert_response :success
  end

  test "should create efficacy" do
    assert_difference('Efficacy.count') do
      post efficacies_url, params: { efficacy: {  } }
    end

    assert_redirected_to efficacy_url(Efficacy.last)
  end

  test "should show efficacy" do
    get efficacy_url(@efficacy)
    assert_response :success
  end

  test "should get edit" do
    get edit_efficacy_url(@efficacy)
    assert_response :success
  end

  test "should update efficacy" do
    patch efficacy_url(@efficacy), params: { efficacy: {  } }
    assert_redirected_to efficacy_url(@efficacy)
  end

  test "should destroy efficacy" do
    assert_difference('Efficacy.count', -1) do
      delete efficacy_url(@efficacy)
    end

    assert_redirected_to efficacies_url
  end
end
