import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { useRouter } from "expo-router";
import { TimerPicker } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function TimerScreen() {
  const router = useRouter();

  const [timerStatus, setTimerStatus] = useState<"stopped" | "running" | "paused">("stopped");
  const [duration, setDuration] = useState({ hours: 0, minutes: 15, seconds: 0 });
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const circleRadius = 110;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const animatedDashoffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerStatus === "running" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerStatus === "running") {
      setTimerStatus("stopped");
    }
    return () => clearInterval(interval);
  }, [timerStatus, timeLeft]);

  useEffect(() => {
    const strokeDashoffset = totalTime > 0 ? circleCircumference - (timeLeft / totalTime) * circleCircumference : 0;
    
    Animated.timing(animatedDashoffset, {
      toValue: strokeDashoffset,
      duration: timerStatus === "running" ? 1000 : 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [timeLeft, totalTime, timerStatus]);

  const handleStart = () => {
    const totalSeconds = duration.hours * 3600 + duration.minutes * 60 + duration.seconds;
    if (totalSeconds > 0) {
      setTotalTime(totalSeconds);
      setTimeLeft(totalSeconds);
      animatedDashoffset.setValue(0);
      setTimerStatus("running");
    }
  };

  const handlePause = () => setTimerStatus("paused");
  
  const handleResume = () => setTimerStatus("running");

  const handleReset = () => {
    setTimerStatus("stopped");
    setTimeLeft(0);
    Animated.timing(animatedDashoffset, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start();
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <View className="flex-1 bg-stone-100">
      <View className="bg-emerald-800 w-full rounded-bl-3xl rounded-br-3xl px-7 py-10 pt-20">
        <Text className="text-white text-4xl font-bold">Cooking Timer</Text>
        <Text className="text-white text-lg mt-1">Track your cooking time!</Text>
      </View>
      
      <View className="bg-white rounded-3xl p-6 shadow-sm items-center justify-center border border-stone-200 mt-5">
        
        {timerStatus === "stopped" ? (
          <View className="items-center mb-8 h-64 justify-center">
            <TimerPicker
              hideHours
              minuteLabel="min"
              secondLabel="sec"
              LinearGradient={LinearGradient}
              initialValue={duration}
              onDurationChange={(newDuration) => {
                setDuration({
                  hours: newDuration.hours || 0,
                  minutes: newDuration.minutes || 0,
                  seconds: newDuration.seconds || 0,
                });
              }}
              styles={{
                theme: "light",
                backgroundColor: "transparent",
                pickerItem: {
                  fontSize: 34,
                },
                pickerLabel: {
                  fontSize: 18,
                  marginTop: 0,
                },
                pickerLabelContainer: {
                  right: -20,
                  top: 0,
                  bottom: 0,
                  width: 40,
                  alignItems: "center",
                },
                pickerItemContainer: {
                  width: 100,
                },
              }}
            />
          </View>
        ) : (
          <View className="items-center justify-center mb-8 w-64 h-64">
            <Svg 
              width="250" 
              height="250" 
              viewBox="0 0 250 250" 
              style={{ transform: [{ rotate: '-90deg' }] }}
            >
              <Circle
                cx="125"
                cy="125"
                r={circleRadius}
                stroke="#e5e7eb" // stone-200
                strokeWidth="12"
                fill="none"
              />
              <AnimatedCircle
                cx="125"
                cy="125"
                r={circleRadius}
                stroke="#047857" // emerald-700
                strokeWidth="12"
                fill="none"
                strokeDasharray={circleCircumference}
                strokeLinecap="round"
                strokeDashoffset={animatedDashoffset}
              />
            </Svg>
            <View className="absolute inset-0 items-center justify-center">
              <Text className="text-6xl font-bold text-stone-800">{formatTime(timeLeft)}</Text>
            </View>
          </View>
        )}

        <View className="flex-row gap-4">
          {timerStatus === "stopped" ? (
            <TouchableOpacity 
              className="bg-emerald-700 rounded-full px-10 py-4"
              onPress={handleStart}
            >
              <Text className="text-white text-xl font-bold">Start</Text>
            </TouchableOpacity>
          ) : timerStatus === "running" ? (
            <TouchableOpacity 
              className="bg-amber-500 rounded-full px-10 py-4"
              onPress={handlePause}
            >
              <Text className="text-white text-xl font-bold">Pause</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              className="bg-emerald-700 rounded-full px-10 py-4"
              onPress={handleResume}
            >
              <Text className="text-white text-xl font-bold">Resume</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            className="bg-stone-200 rounded-full px-10 py-4"
            onPress={handleReset}
          >
            <Text className="text-stone-700 text-xl font-bold">Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-10 gap-4">
        <TouchableOpacity 
          className="bg-white p-5 rounded-2xl flex-row justify-between items-center border border-stone-200"
          onPress={() => router.push("/Settings")}
        >
          <Text className="text-xl font-semibold text-stone-700">Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-white p-5 rounded-2xl flex-row justify-between items-center border border-stone-200"
          onPress={() => router.push("/ShoppingList")}
        >
          <Text className="text-xl font-semibold text-stone-700">Shopping List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

