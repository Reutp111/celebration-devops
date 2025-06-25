# Shop# Celebration DevOps

## תיאור הפרויקט
זהו פרויקט גמר בקורס DevOps. הפרויקט כולל אפליקציה אינטרנטית מבוססת Node.js (Express), עם ניהול משתמשים, מוצרים, וטופס יצירת קשר.  
המטרה הייתה לבנות תהליך DevOps מלא – מהקמת תשתית בענן ועד לפריסה אוטומטית, כולל בדיקות QA.

## טכנולוגיות בשימוש
- Node.js 20+
- Docker & Docker Compose
- Ansible (להקמה אוטומטית של סביבת AWS)
- GitHub Actions (CI/CD)
- Selenium (בדיקות QA אוטומטיות ב־Python)
- MongoDB (מסד נתונים)

## שלבי עבודה עיקריים

### 1. הקמת Dockerfile ו־docker-compose
יצרנו Dockerfile שמבצע build לאפליקציה ו־docker-compose להרצה פשוטה גם ל־app וגם ל־DB.

### 2. אוטומציה עם Ansible
כתבנו Playbook שמרים מכונת EC2 ב־AWS, מתקין Docker ו־docker-compose, מושך את הקוד ומריץ הכל – בלחיצה אחת.

### 3. בדיקות אוטומטיות עם Selenium
הוספנו בדיקות שמוודאות שכל הפיצ'רים המרכזיים של האתר עובדים (עמוד הבית, יצירת מוצר, התחברות, שליחת טופס וכו').

### 4. תהליך CI/CD עם GitHub Actions
הקמנו pipeline שמריץ בדיקות, בונה את הדוקר, ומעלה אותו אוטומטית ל־DockerHub.

