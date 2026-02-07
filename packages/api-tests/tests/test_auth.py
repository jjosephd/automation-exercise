import requests
import pytest

def test_verify_user_exists(base_url):
    user_login = {
        'email': 'test@me.com',
        'password': '123456',
    }
    # Playwright 'form' corresponds to requests 'data' (form-encoded)
    response = requests.post(f"{base_url}/api/verifyLogin", data=user_login)
    data = response.json()
    
    assert response.status_code == 200
    assert data['responseCode'] == 200
    assert 'User exists' in data['message']
