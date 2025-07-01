from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--window-size=1920,1080")

driver = webdriver.Chrome(options=chrome_options)

try:
    driver.get("http://localhost:3001")
    time.sleep(2) 

    assert "celebration" in driver.title.lower()

    login_btn = driver.find_element(By.CSS_SELECTOR, "#login-form button[type='submit']")
    assert login_btn.is_displayed()
    products = driver.find_elements(By.CLASS_NAME, "product")
    assert len(products) > 0

    print("All tests passed!")

finally:
    driver.quit()