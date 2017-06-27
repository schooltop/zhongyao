require 'test_helper'

class PrescriptionDetailsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @prescription_detail = prescription_details(:one)
  end

  test "should get index" do
    get prescription_details_url
    assert_response :success
  end

  test "should get new" do
    get new_prescription_detail_url
    assert_response :success
  end

  test "should create prescription_detail" do
    assert_difference('PrescriptionDetail.count') do
      post prescription_details_url, params: { prescription_detail: {  } }
    end

    assert_redirected_to prescription_detail_url(PrescriptionDetail.last)
  end

  test "should show prescription_detail" do
    get prescription_detail_url(@prescription_detail)
    assert_response :success
  end

  test "should get edit" do
    get edit_prescription_detail_url(@prescription_detail)
    assert_response :success
  end

  test "should update prescription_detail" do
    patch prescription_detail_url(@prescription_detail), params: { prescription_detail: {  } }
    assert_redirected_to prescription_detail_url(@prescription_detail)
  end

  test "should destroy prescription_detail" do
    assert_difference('PrescriptionDetail.count', -1) do
      delete prescription_detail_url(@prescription_detail)
    end

    assert_redirected_to prescription_details_url
  end
end
