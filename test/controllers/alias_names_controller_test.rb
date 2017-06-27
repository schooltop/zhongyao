require 'test_helper'

class AliasNamesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @alias_name = alias_names(:one)
  end

  test "should get index" do
    get alias_names_url
    assert_response :success
  end

  test "should get new" do
    get new_alias_name_url
    assert_response :success
  end

  test "should create alias_name" do
    assert_difference('AliasName.count') do
      post alias_names_url, params: { alias_name: {  } }
    end

    assert_redirected_to alias_name_url(AliasName.last)
  end

  test "should show alias_name" do
    get alias_name_url(@alias_name)
    assert_response :success
  end

  test "should get edit" do
    get edit_alias_name_url(@alias_name)
    assert_response :success
  end

  test "should update alias_name" do
    patch alias_name_url(@alias_name), params: { alias_name: {  } }
    assert_redirected_to alias_name_url(@alias_name)
  end

  test "should destroy alias_name" do
    assert_difference('AliasName.count', -1) do
      delete alias_name_url(@alias_name)
    end

    assert_redirected_to alias_names_url
  end
end
