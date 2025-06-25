from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome() # דורש ש-chromedriver יהיה מותקן במחשב

driver.get("http://localhost:3001")

assert "Celebration" in driver.title

# דוגמה: בדיקת קיום אלמנט בדף
elem = driver.find_element(By.CLASS_NAME, "header") # תשני למחלקה/ID מתאים
assert elem.is_displayed()

print("All tests passed!")
driver.quit()
