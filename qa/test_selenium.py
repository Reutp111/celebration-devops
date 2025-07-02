import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

@pytest.fixture(scope="module")
def driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    driver = webdriver.Chrome(options=chrome_options)
    yield driver
    driver.quit()

def test_homepage(driver):
    driver.get("http://localhost:3001")
    time.sleep(2)
    assert "celebration" in driver.title.lower()
    login_btn = driver.find_element(By.CSS_SELECTOR, "#login-form button[type='submit']")
    assert login_btn.is_displayed()

def test_checkout_page(driver):
    driver.get("http://localhost:3001/html/checkout.html")
    time.sleep(2)
    assert "celebration" in driver.title.lower()
    order_form = driver.find_element(By.ID, "order-form")
    assert order_form.is_displayed()
    submit_btn = driver.find_element(By.CSS_SELECTOR, "#order-form button[type='submit']")
    assert submit_btn.is_displayed()