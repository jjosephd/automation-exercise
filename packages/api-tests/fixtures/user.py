import pytest
import time
import requests

@pytest.fixture(scope="module")
def registered_user(base_url):
    """
    Setup: This code runs BEFORE the tests that use it.
    It creates a user and returns their credentials.
    """
    timestamp = int(time.time())
    email = f"testuser{timestamp}@example.com"
    password = 'password123'
    
    payload = {
        'name': 'Test User',
        'email': email,
        'password': password,
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
    
    # Create the user
    requests.post(f"{base_url}/api/createAccount", data=payload)
    
    # Return the data to the tests
    return {'email': email, 'password': password}

    
@pytest.fixture(scope="module")
def invalid_user(base_url):
    """
    Setup: This code runs BEFORE the tests that use it.
    It creates a user and returns their credentials.
    """
    timestamp = int(time.time())
    email = f"testuser{timestamp}@example.com"
    password = 'password123'
    
    payload = {
        'name': 'Test User',
        'email': email,
        'password': password,
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
    
    # Create the user
    requests.post(f"{base_url}/api/createAccount", data=payload)
    
    # Return the data to the tests
    return {'email': 'email', 'password': password}