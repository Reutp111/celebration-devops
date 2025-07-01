from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

# אפשר להריץ גם ב-headless כדי שלא ייפתח חלון כרום
chrome_options = Options()
chrome_options.add_argument("--headless")

driver = webdriver.Chrome(options=chrome_options)

try:
    driver.get("http://localhost:3001")
    time.sleep(1)

    # בדיקה 1: כותרת הדף
    assert "celebration" in driver.title.lower()

    # בדיקה 2: כפתור התחברות קיים וגלוי
    login_btn = driver.find_element(By.CSS_SELECTOR, "#login-form button[type='submit']")
    assert login_btn.is_displayed()

    # בדיקה 3: יש לפחות מוצר אחד בעמוד (class="product")
    products = driver.find_elements(By.CLASS_NAME, "product")
    assert len(products) > 0

    print("All tests passed!")

finally:
    driver.quit()