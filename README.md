# SmartMed AI Assistant

An intelligent AI-powered pharmaceutical guide that uses comprehensive medical data to provide accurate medicine recommendations, disease detection, and personalized healthcare advice.

## 🚀 Features

### 🤖 AI-Powered Medical Analysis
- **Disease Detection**: Automatically detects potential conditions based on symptoms
- **Symptom Analysis**: Analyzes symptom severity and categorizes primary/secondary symptoms
- **Intelligent Recommendations**: Provides medicine recommendations based on real medical data

### 💊 Comprehensive Medicine Database
- **Real Medical Data**: Uses CSV files containing 40+ diseases and their associated symptoms
- **Symptom Severity Scoring**: Each symptom has a severity weight for accurate analysis
- **Medication Matching**: Matches symptoms to appropriate medications for each disease
- **Precautions & Diet**: Provides disease-specific precautions and dietary recommendations

### 🎯 Smart Features
- **Symptom Search**: Type to search from a database of 100+ medical symptoms
- **Allergy Checking**: Filters out medications based on known allergies
- **Price Sensitivity**: Adjusts recommendations based on price preferences
- **Generic Preferences**: Prioritizes generic medicines when preferred

### 📊 Enhanced Results
- **Medical Analysis**: Shows detected diseases with match percentages
- **Symptom Breakdown**: Displays primary and secondary symptoms with severity scores
- **Purchase Options**: Direct links to major pharmacy platforms (1mg, NetMeds, PharmEasy)
- **Safety Information**: Comprehensive dosage guidelines and contraindications
- **Lifestyle Advice**: Disease-specific dietary and lifestyle recommendations

## 🏥 Medical Database

The application uses the following CSV files from the `Medicine-main` folder:

- **`medications.csv`**: Disease-to-medication mappings
- **`symtoms_df.csv`**: Disease-to-symptom mappings (4922 entries)
- **`Symptom-severity.csv`**: Symptom severity weights (135 symptoms)
- **`precautions_df.csv`**: Disease-specific precautions
- **`diets.csv`**: Disease-specific dietary recommendations
- **`workout_df.csv`**: Disease-specific lifestyle recommendations

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Medical Data**: CSV-based database with 40+ diseases

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎮 How to Use

### 1. Enter Medicine Information
- Input the medicine that's not available
- Examples: "Dolo 650", "Paracetamol", "Ibuprofen"

### 2. Describe Symptoms
- Start typing symptoms to search from the medical database
- Select from suggested symptoms
- Add multiple symptoms separated by commas
- Examples: "fever", "headache", "stomach pain"

### 3. Set Preferences
- Choose symptom severity (mild/moderate/severe)
- Select symptom duration
- Add known allergies
- Set preferences for generic medicines and price sensitivity

### 4. Get AI Analysis
- The system analyzes symptoms against the medical database
- Detects potential diseases with match percentages
- Provides intelligent medicine recommendations
- Shows comprehensive safety and lifestyle advice

## 🔬 How It Works

### Disease Detection Algorithm
1. **Symptom Matching**: Compares patient symptoms with disease symptom databases
2. **Severity Calculation**: Weights symptoms based on medical severity scores
3. **Match Scoring**: Calculates disease match percentages (minimum 30% threshold)
4. **Ranking**: Sorts diseases by match score and returns top 3 matches

### Medicine Recommendation Engine
1. **Disease-Based Selection**: Identifies medications for detected diseases
2. **Allergy Filtering**: Removes medications that match known allergies
3. **Effectiveness Ranking**: Prioritizes medications by effectiveness scores
4. **Alternative Generation**: Creates substitution tiers with bioequivalence info

### Safety & Lifestyle Integration
1. **Precaution Matching**: Provides disease-specific precautions
2. **Dietary Advice**: Suggests appropriate diets for detected conditions
3. **Lifestyle Recommendations**: Offers workout and lifestyle tips
4. **Red Flag Detection**: Identifies symptoms requiring immediate medical attention

## 📱 User Interface

### Form Features
- **Smart Symptom Search**: Real-time symptom suggestions from medical database
- **Symptom Tags**: Visual representation of selected symptoms with remove option
- **Preference Controls**: Checkboxes for generic and price preferences
- **Loading States**: Clear feedback during medical data analysis

### Results Display
- **Medical Analysis Section**: Shows detected diseases and symptom breakdown
- **Primary Recommendation**: Highlighted with confidence score and rationale
- **Substitution Options**: Tiered alternatives with pricing and bioequivalence
- **Purchase Integration**: Direct links to pharmacy platforms
- **Safety Information**: Comprehensive dosage and contraindication details

## 🔒 Safety & Disclaimers

### Medical Disclaimer
- This application provides AI-powered guidance but does not replace professional medical advice
- Always consult qualified healthcare providers for medical decisions
- The system is designed to supplement, not replace, medical consultation

### Data Accuracy
- Medical data is sourced from comprehensive disease databases
- Symptom severity weights are based on medical literature
- Recommendations are generated using evidence-based algorithms

### Emergency Situations
- The system includes red flag detection for serious symptoms
- Users are advised to seek immediate medical care for severe symptoms
- Emergency contact information should be readily available

## 🚀 Future Enhancements

### Planned Features
- **User Profiles**: Save medical history and preferences
- **Medication Interactions**: Check for drug-drug interactions
- **Side Effect Analysis**: Provide detailed side effect information
- **Telemedicine Integration**: Connect with healthcare providers
- **Mobile App**: Native mobile application development

### Data Enhancements
- **More Diseases**: Expand disease database coverage
- **Regional Medications**: Add location-specific medicine availability
- **Clinical Guidelines**: Integrate latest medical guidelines
- **Patient Reviews**: Include user experience data

## 🤝 Contributing

We welcome contributions to improve the SmartMed AI Assistant:

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

### Areas for Contribution
- **Medical Data**: Add more diseases and symptoms
- **UI/UX**: Improve user interface and experience
- **Algorithms**: Enhance recommendation accuracy
- **Documentation**: Improve code and user documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common questions

---

**Note**: This application is for educational and informational purposes. Always consult healthcare professionals for medical decisions. 