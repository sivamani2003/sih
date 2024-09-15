import pytesseract
from PIL import Image
import re

# Load the image
img = Image.open("/Users/sivamani/Desktop/sih/ocr/Transfer certificate - inter.jpeg")

# Extract text using Tesseract
extracted_text = pytesseract.image_to_string(img)
print("Extracted text:", extracted_text)

# Clean the text
cleaned_text = re.sub(r'\n+', ' ', extracted_text)  # Remove line breaks
cleaned_text = re.sub(r'[^a-zA-Z0-9\s]', '', cleaned_text)  # Remove special characters
print("Cleaned text:", cleaned_text)

# Dictionary of castes and categories
caste_dict = {
    # Forward Castes (General Category)
    'Brahmin': 'Forward Caste', 'Kshatriya': 'Forward Caste', 'Vaishya': 'Forward Caste', 'Vysya': 'Forward Caste',
    'Velama': 'Forward Caste', 'Kapu': 'Forward Caste', 'Reddy': 'Forward Caste',
    
    # Backward Classes (OBC)
    'Agnikulakshatriya': 'OBC', 'Arya Vysya': 'OBC', 'Balija': 'OBC', 'Bestha': 'OBC', 'Chakali': 'OBC', 'Ediga': 'OBC',
    'Goud': 'OBC', 'Kuruba': 'OBC', 'Madiga': 'OBC', 'Mangali': 'OBC', 'Mudaliar': 'OBC', 'Mudiraj': 'OBC',
    'Mutrasi': 'OBC', 'Padmasali': 'OBC', 'Rajaka': 'OBC', 'Setti Balija': 'OBC', 'Telaga': 'OBC', 'Uppara': 'OBC',
    'Vaddera': 'OBC', 'Yadava': 'OBC', 'Perika': 'OBC', 'Thogata Veera Kshatriya': 'OBC',
    
    # Scheduled Castes (SC)
    'Adi Andhra': 'SC', 'Mala': 'SC', 'Madiga': 'SC', 'Dommara': 'SC', 'Pambada': 'SC', 'Chamar': 'SC',
    'Dakkal': 'SC', 'Jambavan': 'SC', 'Masti': 'SC', 'Dhangar': 'SC',
    
    # Scheduled Tribes (ST)
    'Koya': 'ST', 'Lambada': 'ST', 'Yanadi': 'ST', 'Sugali': 'ST', 'Gond': 'ST', 'Nayak': 'ST', 'Yerukala': 'ST',
    'Chenchu': 'ST', 'Kondareddy': 'ST', 'Kondh': 'ST',
    
    # Other categories
    'Shudra': 'Other', 'SC': 'Scheduled Caste', 'ST': 'Scheduled Tribe', 'OBC': 'Other Backward Class','OC':'OC'
}

# Function to extract caste from the text
def extract_caste(text, caste_dict):
    for caste, category in caste_dict.items():
        if caste.lower() in text.lower():
            return f"{caste} ({category})"
    return 'Caste not found'

# Extract caste information
caste_info = extract_caste(cleaned_text, caste_dict)
print(f"Caste identified: {caste_info}")
