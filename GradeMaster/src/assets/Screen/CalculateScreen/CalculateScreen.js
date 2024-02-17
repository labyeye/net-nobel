
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Platform } from "react-native";
import { BannerAd, BannerAdSize, RewardedAdEventType } from 'react-native-google-mobile-ads';
import { RewardedAd } from 'react-native-google-mobile-ads';

const adunitId = 'ca-app-pub-6119758783032593/7813203928';
const rewarded = RewardedAd.createForAdRequest(adunitId, {
  keywords: ['fashion', 'clothing'],
});

const CalculateScreen = () => {
    const maxSubjects = 8;
    const minSubjects = 5;
    const [subjectCount, setSubjectCount] = useState(5); // Default number of subjects
    const [subjects, setSubjects] = useState(Array.from({ length: maxSubjects }, () => ({ name: "", grade: "", credits: "" })));
    const [cgpa, setCGPA] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [adLoaded, setadLoaded] = useState(false);


    useEffect(() => {
        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
          setLoaded(true);
        });
        const unsubscribeEarned = rewarded.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          reward => {
            // Assuming the reward.amount is the calculated CGPA
            setCGPA(reward.amount.toFixed(2));
            console.log('User earned reward of ', reward);
          },
        );
    
        // Start loading the rewarded ad straight away
        rewarded.load();
    
        // Unsubscribe from events on unmount
        return () => {
          unsubscribeLoaded();
          unsubscribeEarned();
        };
      }, []);
    

    const handleCalculatePress = () => {
        if (adLoaded) {
            rewarded.show();
        } else {
            // If ad is not loaded, calculate CGPA directly
            calculateCGPA();
        }
    };
    
    

    const handleSubjectChange = (index, field, value) => {
        const newSubjects = [...subjects];
        newSubjects[index][field] = value;
        setSubjects(newSubjects);
    };
    

    const getGradeValue = (grade) => {
        // Define your grade values here
        switch (grade) {
            case "O" || "o":
                return 10;
            case "A+" || "a+":
                return 9.18;
            case "A" || "a":
                return 8.33;
            case "B+" || "b+":
                return 7.50;
            case "B" || "b":
                return 6.68;
            case "C+" || "c+":
                return 5.83
            case "C" || "c":
                return 5.00;
            default:
                return 0;
        }
    };
    const calculateCGPA = () => {
        const totalCredits = subjects.reduce((sum, subject) => sum + parseFloat(subject.credits || 0), 0);
        const weightedGradePoints = subjects.reduce((sum, subject) => {
            const gradeValue = getGradeValue(subject.grade);
            return sum + gradeValue * parseFloat(subject.credits || 0);
        }, 0);

        const calculatedCGPA = totalCredits !== 0 ? weightedGradePoints / totalCredits : 0;
        setCGPA(calculatedCGPA.toFixed(2)); // Round to two decimal places
    };
    const addSubject = () => {
        if (subjectCount < maxSubjects) {
            setSubjectCount(subjectCount + 1);
        }
    };

    const removeSubject = () => {
        if (subjectCount > minSubjects) {
            setSubjectCount(subjectCount - 1);
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: '#efefd0', justifyContent: 'center', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
            <View style={{ marginTop: 0 }}>
                <Text style={styles.text}>Calculate your CGPA</Text>
            </View>
            <View style={{ flexDirection: 'row', width: "100%", gap: 10, justifyContent: 'center', height: "60%" }}>
                <View style={{ width: "60%", gap: 10 }}>
                    <Text>Subjects</Text>
                    {[...Array(subjectCount)].map((_, index) => (
                        <TextInput
                            key={index}
                            style={[styles.textinput, styles.shadowProp]}
                            onChangeText={(value) => handleSubjectChange(index, "grade", value)}
                            placeholder={`Enter Subject ${index + 1}`}
                        />
                    ))}
                </View>
                <View style={{ width: "15%", gap: 10 }}>
                    <Text>Grade</Text>
                    {[...Array(subjectCount)].map((_, index) => (
                        <TextInput
                            key={index}
                            style={[styles.textinput1, styles.shadowProp]}
                            onChangeText={(value) => handleSubjectChange(index, "grade", value)}
                        />
                    ))}
                </View>
                <View style={{ width: "12%", gap: 10 }}>
                    <Text>Credits</Text>
                    {[...Array(subjectCount)].map((_, index) => (
                        <TextInput
                            key={index}
                            style={[styles.textinput2, styles.shadowProp]}
                            onChangeText={(value) => handleSubjectChange(index, "credits", value)}
                        />
                    ))}
                </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity style={styles.add} onPress={addSubject}>
                    <Image source={require('../../Images/add.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.but} onPress={handleCalculatePress}>
                    <Text style={styles.button}>Calculate</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.remove} onPress={removeSubject}>
                    <Image source={require('../../Images/delete.png')} />
                </TouchableOpacity>
            </View>
            <Text style={{ fontWeight: 'bold' }}>Your CGPA is {cgpa}</Text>
            <BannerAd
                unitId={Platform.OS === 'ios'
                    ? 'ca-app-pub-6119758783032593/2442421770'
                    : null}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{ requestNonPersonalizedAdsOnly: true }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -5, height: 7 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    text: {
        fontSize: 30,
        color: "#004e89",
        fontWeight: 'bold',
        alignSelf: "center",
        fontFamily: "MontserratAlternates-Regular"
    },
    textinput: {
        height: "9%",
        width: "100%",
        borderColor: "black",
        borderRadius: 10,
        paddingLeft: 5,
        backgroundColor: '#f7c59f'
    },
    textinput1: {
        height: "9%",
        width: "100%",
        borderColor: "black",
        borderRadius: 10,
        paddingLeft: 20,
        backgroundColor: '#f7c59f'
    },
    textinput2: {
        height: "9%",
        width: "100%",
        borderColor: "black",
        borderRadius: 10,
        paddingLeft: 15,
        backgroundColor: '#f7c59f'
    },
    but: {
        backgroundColor: "#004e89",
        padding: 10,
        width: "35%",
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: "center"
    },
    button: {
        color: "white"
    },
    add: {
        backgroundColor: "#004e89",
        padding: 10,
        width: "20%",
        borderRadius: 50,
        alignItems: 'center',
    },
    remove: {
        backgroundColor: "#004e89",
        padding: 10,
        width: "20%",
        borderRadius: 50,
        alignItems: 'center',
    },
});

export default CalculateScreen;
