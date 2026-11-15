# LUMI

**An Interactive, Context-Aware AI Cognitive Companion**

*Bringing together desktop intelligence, physical interaction, and cognitive reasoning.*

| Item | Details |
|---|---|
| Platform | Windows Desktop + ESP32 Physical Pet |
| Course | SCSE3103-04 Cognitive Computing |
| Institution | Universiti Teknologi Malaysia (UTM) |
| Team Members | WU YUQI, BAO YILIN |

---

## About LUMI

LUMI is an interactive AI cognitive companion that combines a Windows desktop application with a self-built physical pet.

We are developing LUMI to support everyday activities through natural conversation, task management, intelligent reminders, and context-aware recommendations. Alongside these practical functions, the companion responds through animated expressions, touch interactions, movement, and sounds to create a more engaging experience.

Our goal is to explore how cognitive computing can help an interactive companion interpret information, reason about different situations, and provide understandable recommendations.

## Contents

- [About LUMI](#about-lumi)
- [What We're Building](#what-were-building)
- [Cognitive Computing Approach](#cognitive-computing-approach)
- [Proposed System Architecture](#proposed-system-architecture)
- [Technology Stack](#technology-stack)

## What We're Building

### Desktop Companion

The Windows application will include:

- An animated 2D desktop pet with interactive expressions and responses.
- Natural-language conversation using a pretrained language model.
- Task creation, organisation, prioritisation, and reminders.
- Context-aware suggestions supported by cognitive reasoning.
- Clear explanations and user confirmation for important actions.

### Physical Companion

The ESP32-based physical pet will include:

- Environmental sensing for temperature, humidity, and light.
- Touch and motion-based interactions.
- Animated facial expressions on an OLED display.
- Buzzer sounds for feedback and notifications.
- USB Serial communication with the desktop application.

Together, these components will allow LUMI to connect software-based intelligence with physical interaction.

## Cognitive Computing Approach

LUMI will integrate three complementary cognitive computing methods.

**Knowledge Representation**

Structured information about tasks, deadlines, preferences, and environmental observations will support contextual understanding and decision-making.

**Rule-Based Reasoning**

Explicit rules will handle task constraints, reminder conditions, validation, and user confirmation.

**Fuzzy Logic**

Fuzzy inference will support task prioritisation and environmental assessment when conditions cannot be represented adequately by strict categories.

We plan to evaluate the cognitive reasoning components against simpler rule-based baselines, examining recommendation quality, explanation correctness, and system reliability.

## Proposed System Architecture

LUMI will connect its desktop and physical components through a shared interaction workflow:

**User Input & Sensor Data → Context Processing → Cognitive Reasoning → Response & Interaction**

The desktop application will manage conversations, tasks, local data, and reasoning processes. The ESP32 will collect sensor readings and handle physical interactions, communicating with the desktop through USB Serial.

## Technology Stack

| Component | Planned Technology |
|---|---|
| Desktop Application | Electron, React, Vite, TypeScript |
| Application Core | Node.js |
| Local Data Storage | SQLite |
| Cognitive Reasoning | Knowledge Representation, Rule-Based Reasoning, Fuzzy Logic |
| AI Conversation | Pretrained LLM API |
| Hardware Controller | ESP32-WROOM |
| Firmware | Arduino C++ |
| Device Communication | USB Serial |
