import requests
import pytest
import time

# Create a consistent user for login tests
user_login = {
        'email': 'testuser4390@example.com',
        'password': 'password123',
    }
user_login_invalid = {
    'email': 'testuser4390@example.com',
    'password': 'invalid_pass',
}

# POST Methods

def test_verify_user_exists(base_url):
    '''
    Test response for existing user with valid credentials
    '''

    # Playwright 'form' corresponds to requests 'data' (form-encoded)
    response = requests.post(f"{base_url}/api/verifyLogin", data=user_login)
    data = response.json()
    
    assert response.status_code == 200
    assert data['responseCode'] == 200
    assert 'User exists' in data['message']

def test_verify_login_without_email_param(base_url):
    '''
    POST To Verify Login without email parameter
    '''
    response = requests.post(f"{base_url}/api/verifyLogin", data={'password': '123456'})
    data = response.json()

    assert response.status_code == 200
    assert data['responseCode'] == 400
    assert 'Bad request, email or password parameter is missing in POST request' in data['message']

def test_post_verify_login_invalid_details(base_url):
    '''
    POST To Verify Login with invalid details
    '''
    response = requests.post(f"{base_url}/api/verifyLogin", data=user_login_invalid)
    data = response.json()

    assert response.status_code == 200
    assert data['responseCode'] == 404
    assert 'User not found' in data['message']

#def test_create_new_user(base_url, registered_user):
#    '''
#    POST To Create/Register User Account
#   '''

#   response = requests.post(f"{base_url}/api/createAccount", data=registered_user)
#    data = response.json()

#   assert response.status_code == 200
#    assert data['responseCode'] == 201
#    assert 'User created' in data['message']
    



# DELETE Methods

def test_delete_to_verify_login(base_url, registered_user):
    '''
    API 9: DELETE To Verify Login
    '''
    response = requests.delete(f"{base_url}/api/verifyLogin", data=registered_user)
    data = response.json()

    assert response.status_code == 200
    assert data['responseCode'] == 405
    assert 'This request method is not supported' in data['message']  

def test_delete_user(base_url, registered_user):
    '''
    API 12: DELETE METHOD To Delete User Account
    '''
    response = requests.delete(f"{base_url}/api/deleteAccount", data=registered_user)
    data = response.json()
    assert response.status_code == 200
    assert data['responseCode'] == 200
    assert 'Account deleted' in data['message']


# PUT Methods

def test_update_user_account(base_url):
    '''
    Update existing user account with valid credentials
    '''
    response = requests.put(f"{base_url}/api/updateAccount", data=user_login)
    data = response.json()
    assert response.status_code == 200
    assert data['responseCode'] == 200
    assert 'User updated' in data['message']


def test_update_invalid_user(base_url):
    '''
    EDGE CASE: Attempt to update user with invalid name
    '''
    response = requests.put(f"{base_url}/api/updateAccount", data={"email": "email", "password": "password"})
    data = response.json()

    assert response.status_code == 200
    assert data['responseCode'] == 404
    assert 'Account not found' in data['message']

def test_update_user_invalid_password(base_url):
    '''
    EDGE CASE: Attempt to update user with invalid password
    '''
    response = requests.put(f"{base_url}/api/updateAccount", data={"email": user_login['email'], "password": "password"})
    data = response.json()

    assert response.status_code == 200
    assert data['responseCode'] == 404
    assert 'Account not found' in data['message']