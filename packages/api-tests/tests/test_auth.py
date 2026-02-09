import requests
import pytest
import time

def test_verify_user_exists(base_url):
    user_login = {
        'email': 'testuser4390@example.com',
        'password': 'password123',
    }
    # Playwright 'form' corresponds to requests 'data' (form-encoded)
    response = requests.post(f"{base_url}/api/verifyLogin", data=user_login)
    data = response.json()
    
    assert response.status_code == 200
    assert data['responseCode'] == 200
    assert 'User exists' in data['message']

def test_create_new_user(base_url):

    timestamp = int(time.time())
    email = f"testuser{timestamp}@example.com"
    req_params = {
        'name': 'Test User',
        'email': email,
        'password': 'password123',
        'title': 'Mr',
        'birth_date': '1',
        'birth_month': 'January',
        'birth_year': '1990',
        'firstname': 'Test',
        'lastname': 'User',
        'company': 'Test Company',
        'address1': '123 Test Street',
        'address2': 'Apt 4',
        'country': 'United States',
        'zipcode': '12345',
        'state': 'California',
        'city': 'Los Angeles',
        'mobile_number': '1234567890'
    }


    response = requests.post(f"{base_url}/api/createAccount", data=req_params)
    data = response.json()

    assert response.status_code == 200
    assert data['responseCode'] == 201
    assert 'User created' in data['message']

