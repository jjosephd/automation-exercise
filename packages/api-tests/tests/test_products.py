import requests
import pytest

NEW_POST_DATA = {
    'title': 'Test title',
    'body': 'Test body',
    'id': 1,
}
NEW_SEARCH_DATA = 't-shirt'

def test_verify_can_access_public_products_api(base_url):
    response = requests.get(f"{base_url}/api/productsList")
    assert response.status_code == 200
    data = response.json()
    assert data['responseCode'] == 200
    assert 'products' in data
    assert isinstance(data['products'], list)

def test_verify_post_error_handling_for_products(base_url):
    # Playwright 'data' corresponds to requests 'json'
    response = requests.post(f"{base_url}/api/productsList", json=NEW_POST_DATA)
    data = response.json()
    assert data['responseCode'] == 405
    assert 'This request method is not supported.' in data['message']

def test_verify_post_response_for_search_product_feature(base_url):
    # Playwright 'form' corresponds to requests 'data'
    response = requests.post(f"{base_url}/api/searchProduct", data={'search_product': NEW_SEARCH_DATA})
    data = response.json()
    assert data['responseCode'] == 200
    assert 'products' in data
    assert isinstance(data['products'], list)

def test_verify_response_message_and_code_based_on_bad_request_no_search_product_param(base_url):
    response = requests.post(f"{base_url}/api/searchProduct")
    data = response.json()
    assert data['responseCode'] == 400
    assert 'Bad request, search_product parameter is missing in POST request' in data['message']

def test_get_all_brands(base_url):
    response = requests.get(f"{base_url}/api/brandsList")
    assert response.status_code == 200
    data = response.json()
    assert data['responseCode'] == 200
    assert 'brands' in data
    assert isinstance(data['brands'], list)

def test_put_to_all_brands_list(base_url):
    # Playwright 'data' corresponds to requests 'json'
    response = requests.put(f"{base_url}/api/brandsList", json=NEW_POST_DATA)
    data = response.json()
    assert data['responseCode'] == 405
    assert 'This request method is not supported' in data['message']
