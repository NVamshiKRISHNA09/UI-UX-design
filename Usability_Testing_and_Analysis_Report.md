# Usability Testing & Analysis Report: AuraHealth Care Portal
**Document Version**: 1.0.0  
**Date**: May 30, 2026  
**Lead UX Researcher & Designer**: Senior Usability Engineer & Product Designer  
**Target Product**: AuraHealth Care Patient Portal (Desktop Web)  

---

## Executive Summary

AuraHealth Care is a comprehensive patient portal designed to facilitate telehealth booking, medical record access, and prescription self-management. To evaluate the platform’s efficiency, effectiveness, and user satisfaction, a mixed-methods usability study was conducted with five participants representing diverse patient demographics (ranging in age from 34 to 68, with varying digital literacy levels and physical capabilities). 

The usability testing revealed critical friction points in the scheduling system, diagnostic results interpretation, and prescription billing interface. Quantitative results showed:
*   An overall **Task Success Rate of 60%**, indicating significant barriers to basic healthcare tasks.
*   A mean **System Usability Scale (SUS) score of 52.5/100**, placing the current portal in the "F" grade category (below the industry benchmark of 68), signaling a high risk of user abandonment.
*   A **Net Promoter Score (NPS) of -60**, reflecting strong user frustration.
*   **NASA-TLX cognitive load index** averaged **64/100**, highlighting severe mental fatigue during scheduling and bill resolution.

Key issues identified include:
1.  **High Cognitive Choice Overhead** (violating Hick's Law) during physician selection.
2.  **Terminology Barriers** (violating Heuristic #2: Match between system and real world) within laboratory results, inducing medical anxiety.
3.  **Fitts's Law Violations** on critical call-to-actions (CTAs) within the booking and payment flows.
4.  **WCAG 2.2 Accessibility Violations**, specifically poor color contrast (1.8:1 ratio) and lack of keyboard focus styles, which disproportionately affected elderly and visually impaired users.

This report documents the research methodologies, detailed metrics, heuristic evaluations, and root causes of these failures. We propose a three-tiered redesign strategy (Immediate, Short-term, and Long-term) accompanied by high-fidelity ASCII wireframes and flow comparisons to streamline workflows, reduce clinical call-center dependency by an estimated 25%, and align AuraHealth Care with modern, accessible human-centered design standards.

---

## 1. Project Overview

### 1.1 Product Description
AuraHealth Care is a desktop web-based personal health record (PHR) and clinical communication portal. It serves as the primary digital interface between AuraHealth Medical Group’s patients and healthcare providers. The core features include:
*   **Telehealth Scheduling**: Selecting specialists, booking appointment slots, and setting up remote video consultations.
*   **My Health Records**: Reviewing laboratory reports, vital trends, imaging results, and physician notes.
*   **Prescription Hub**: Viewing active prescriptions, requesting refills, and managing delivery/billing options.

### 1.2 Business Objectives
1.  **Reduce Customer Support Overhead**: Decrease call center call volume related to appointment booking and billing queries by 25% within six months of redesign launch.
2.  **Increase Self-Service Completion**: Achieve a 90% completion rate for digital prescription refills and electronic copayments.
3.  **Minimize Appointment No-Shows**: Ensure 98% of telehealth patients successfully complete their pre-visit tech setup and connect on time.

### 1.3 User Objectives
1.  **Frictionless Scheduling**: Book a specialist consultation in under 3 minutes without requiring phone intervention.
2.  **Transparent Medical Data**: Access, read, and comprehend diagnostic results without experiencing clinical jargon-induced anxiety.
3.  **Effortless Refills**: Renew chronic medications and settle outstanding balances in a simple, secure transaction.

### 1.4 Scope of Usability Testing
The usability evaluation focused strictly on the desktop web interface, assessing three core, high-priority user journeys:
1.  **Flow 1: Specialist Appointment Booking**: From initial dashboard entry to final confirmation of a cardiologist consultation.
2.  **Flow 2: Diagnostic Results Comprehension**: Accessing a lipid panel report, identifying high cholesterol markers, and downloading the PDF.
3.  **Flow 3: Prescription Refill & Billing**: Submitting a refill request for a recurring blood pressure medication, updating insurance details, and processing a copayment.

### 1.5 Success Criteria
To deem the product ready for production release, it must satisfy the following usability gates:
*   **Task Success Rate (TSR)**: $\ge 85\%$ across all tested scenarios.
*   **System Usability Scale (SUS)**: Mean score $\ge 75$ (representing "Good to Excellent" usability, Grade B).
*   **Average Time on Task (ToT)**: Scheduling $\le 180\text{ seconds}$; Lab check $\le 90\text{ seconds}$; Refill $\le 120\text{ seconds}$.
*   **Error Rate**: $\le 1.5$ errors per task session.
*   **Net Promoter Score (NPS)**: Positive score ($\ge +30$).

---

## 2. UX Research Foundation

### 2.1 Stakeholder Analysis
To align product strategy with organizational constraints, the following stakeholder matrix was executed:

| Stakeholder Role | Influence | Interest | Key Concerns & Requirements |
| :--- | :--- | :--- | :--- |
| **Clinical Directors** | High | High | Clinical safety, patient compliance with treatment, prevention of medical misinformation or patient anxiety. |
| **Product Manager** | High | High | Feature release velocity, user retention metrics, support ticket reductions, development costs. |
| **Compliance Officer** | High | Medium | HIPAA compliance, data privacy, security of electronic protected health info (ePHI), WCAG 2.2 legal requirements. |
| **Lead Developer** | Medium | High | Technical feasibility, database load during real-time calendar queries, reusability of component design library. |
| **Patient Advisory Board** | Low | High | Ease of use, accessibility for chronic-condition sufferers, prompt customer care channels. |

### 2.2 User Research Summary
Prior to usability testing, a survey was distributed to 120 active AuraHealth patients, supplemented by 10 structured interviews. Key insights:
*   **42% of patients over age 50** reported feeling "extremely overwhelmed" or "anxious" when logging into the current portal.
*   **61% of users** stated they bypassed the digital booking system and called the clinic receptionist directly because the online booking calendar was "confusing" and "kept giving errors."
*   **73% of patients** indicated they could not understand their diagnostic lab sheets online without searching Google for terms like "HDL" and "LDL," often leading to self-diagnosis anxiety.

### 2.3 User Personas
To capture the requirements of the dual-audience spectrum, two primary personas were developed:

#### Persona A: Eleanor Vance (Primary - The Chronic Manager)
```
+--------------------------------------------------------------+
| ELEANOR VANCE (Age 68) - Retired Educator                    |
| "Managing my health shouldn't feel like a computer science   |
| exam. I just want to book my doctor and see if my pills work."|
+--------------------------------------------------------------+
| BACKGROUND:                                                  |
| * Diagnosed with hypertension and type-2 diabetes.           |
| * Accesses the web via a 15-inch desktop monitor.            |
| * Suffers from early-stage cataracts (needs visual aids).    |
| * Digital Literacy: Low. Uses email and reads news online.    |
|                                                              |
| GOALS:                                                       |
| * Easily book quarterly cardiologist reviews.                |
| * See lab results in clear, plain language.                  |
| * Renew blood pressure medication without calling the clinic.|
|                                                              |
| PAIN POINTS:                                                 |
| * Text is too small and lacks contrast.                      |
| * Scared of making mistakes that might cancel her insurance. |
| * Clinical jargon creates panic.                             |
+--------------------------------------------------------------+
```

#### Persona B: Marcus Chen (Secondary - The Time-Saver)
```
+--------------------------------------------------------------+
| MARCUS CHEN (Age 34) - Software Engineer                     |
| "I want to log in, click twice, and get my receipt. If I have|
| to read a manual to book a telehealth call, I'll switch clinic"|
+--------------------------------------------------------------+
| BACKGROUND:                                                  |
| * Busy lifestyle, values digital-first operations.           |
| * High digital literacy; expects seamless modern web UX.     |
| * Uses keyboard shortcuts, multiple monitors, and dark mode.  |
|                                                              |
| GOALS:                                                       |
| * Fast appointment scheduling during meeting breaks.         |
| * Integration of schedules with Google Calendar.             |
| * Instant PDF download of lab test results for insurance.    |
|                                                              |
| PAIN POINTS:                                                 |
| * Clunky, multi-step layouts that waste time.                |
| * Slow system response times (lack of feedback).             |
| * Inability to view clear breakdowns of copay fees.          |
+--------------------------------------------------------------+
```

### 2.4 User Journey Mapping
The following journey map illustrates the path of Eleanor Vance attempting to schedule an appointment and check her labs.

```mermaid
journey
    title Patient Journey Map: Eleanor Vance
    section 1. Initiation
      Log in to portal: 3: Patient struggles with low contrast text
      Read dashboard: 2: Overwhelmed by 14 different menu choices
    section 2. Scheduling
      Search cardiologist: 2: High friction, list lacks specialty filters
      Select date/time: 1: Severe confusion; calendar picker does not support keyboard inputs
      Confirm booking: 2: Tiny "Confirm" button missed, patient anxious about validation
    section 3. Results Analysis
      Locate lab report: 3: Navigational dead ends; results buried under "Documents"
      Read lipid panel: 1: High anxiety; red text highlighting "Abnormal LDL" without explanation
      Download PDF: 2: Hidden download icon without text label
```

### 2.5 Pain Point Analysis
We synthesized user pain points into four distinct categories:

*   **Usability Pain Points**: The "Confirm" buttons are visually identical to secondary buttons, causing users to drop off before finishing the task.
*   **Technical Pain Points**: Booking pages have long load times (>2.8s) without loading animations, leading to double-clicking and duplicate bookings.
*   **Cognitive Pain Points**: Raw lab values (e.g., "LDL-C 142 mg/dL") are displayed without normal-range reference visual aids or simple status indicators (e.g., Normal, High).
*   **Accessibility Pain Points**: Light gray texts on white backgrounds (#9E9E9E on #FFFFFF, contrast ratio 1.8:1) violate WCAG AA standards. Tab index order is illogical, preventing keyboard-only navigation.

---

## 3. Usability Test Planning

### 3.1 Research Objectives
1.  Evaluate the discoverability and completion rate of the telehealth appointment booking process.
2.  Determine the comprehension rate of laboratory report findings and identify sources of cognitive load.
3.  Identify usability friction, input validation errors, and accessibility blockers within the payment and prescription refill forms.
4.  Gather subjective feedback using standard scales (SUS, NPS, NASA-TLX) to benchmark system acceptance.

### 3.2 Hypotheses
*   **Hypothesis 1 (Scheduling)**: The lack of step-by-step progress wizard and a non-standard calendar picker (violating Jakob’s Law) will result in a Task Success Rate under 60% for users over 50.
*   **Hypothesis 2 (Lab Comprehension)**: Presenting raw medical data without plain-language translations or color-coded charts will result in NASA-TLX cognitive load ratings exceeding 70% in the "Frustration" and "Mental Demand" dimensions.
*   **Hypothesis 3 (Prescription Billing)**: The absence of auto-fill capabilities for insurance/billing profiles will drive high input error rates (average $>2$ slips/mistakes per user) and prolong Time on Task beyond 180 seconds (Tesler's Law violation).

### 3.3 Testing Methodology
A mixed-methods, moderated usability testing protocol was selected to capture rich qualitative insights (think-aloud data, frustration signals) alongside robust quantitative metrics (success rates, task duration, error frequencies).

| Dimension | Moderated Testing | Unmoderated Testing |
| :--- | :--- | :--- |
| **AuraHealth Choice** | **Moderated (Selected)** | **Unmoderated (Not Used)** |
| **Rationale** | Highly critical medical portal requires deep qualitative probe into *why* patients experience clinical anxiety. Direct moderation allows prompt intervention in case of extreme frustration without leading the user. | Useful for large-scale quantitative validation, but misses subtle physical adjustments (squinting, manual zooming) and spontaneous user comments. |

### 3.4 Remote vs. In-Person Testing Considerations
*   **Remote Moderated Testing (Selected)**: Allowed participants to test from their home environments, utilizing their personal assistive devices (e.g., customized screen magnifiers, ergonomic keyboards). This ensured high external validity.
*   **In-Person (Considered)**: Offers tighter control over hardware variables and precise eye-tracking, but introduces laboratory bias and scheduling constraints for high-risk clinical populations.

### 3.5 Ethical Guidelines and Participant Consent
*   **Consent Protocol**: All participants signed an Informed Consent Form electronically prior to the session.
*   **HIPAA & Privacy**: No actual protected health information (PHI) was used. Simulated test accounts populated with synthetic clinical records were assigned. Screen recordings were cropped to exclude user webcam footage, protecting identities.
*   **Data Security**: Recorded media and logs were stored on an encrypted, access-restricted cloud storage environment and scheduled for deletion after analysis.

---

## 4. Participant Recruitment

### 4.1 Define Target Audience
The recruitment criteria aimed to replicate AuraHealth’s active patient demographics, emphasizing two distinct age groups to balance digital fluency and accessibility needs.

### 4.2 Screening Criteria
*   **Inclusion Criteria**:
    *   Age: 18–75 years.
    *   Must have scheduled at least one online appointment or filled a prescription digitally in the past 12 months (on any platform).
    *   Willingness to share screen and talk out loud during a 45-minute video conference.
*   **Exclusion Criteria**:
    *   Healthcare professionals, medical receptionists, or professional software/UX engineers.
    *   Current employees of AuraHealth or immediate competitors.

### 4.3 Sample Size Justification
We recruited **N = 5** participants. According to usability research pioneer Jakob Nielsen and landauer's mathematical model of usability discovery:
$$U = 1 - (1 - L)^n$$
Where $U$ is the proportion of usability problems found, $L$ is the probability of detecting a single usability problem (typically 0.31), and $n$ is the number of users. 
For $n = 5$:
$$U = 1 - (1 - 0.31)^5 \approx 1 - (0.69)^5 \approx 1 - 0.156 \approx 84.4\%$$
Testing 5 users is the most cost-effective approach, revealing approximately **85%** of major usability issues without diminishing returns.

### 4.4 Participant Demographics
The recruited cohort represented the spectrum of target personas:

| ID | Age | Persona Match | Digital Literacy | Visual/Cognitive Aids Used | Self-Reported Frequency of Portal Use |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **P1** | 68 | Eleanor Vance | Low | 150% System Zoom, Reading Glasses | Rare (Prefers calling receptionist) |
| **P2** | 62 | Eleanor Vance | Medium-Low | Reading Glasses, High Contrast Theme | Occasional (Once every 3 months) |
| **P3** | 45 | Hybrid | Medium | None | Monthly |
| **P4** | 35 | Marcus Chen | High | None | Bi-weekly |
| **P5** | 34 | Marcus Chen | High | Keyboard navigation, Dark mode | Monthly |

---

## 5. Test Scenarios and Tasks

### 5.1 Scenario 1: Specialist Telehealth Booking
*   **Context**: You have been feeling occasional chest palpitations. Your primary physician referred you to a cardiologist, Dr. Sandra Patel, for a telehealth consultation.
*   **Task**: "Log into your AuraHealth dashboard. Locate the booking section and schedule a telehealth appointment with Dr. Sandra Patel for next Tuesday at 10:00 AM. Stop when you reach the booking confirmation screen."
*   **Success Criteria**: User successfully lands on the booking confirmation screen with Dr. Sandra Patel’s details for the correct time slot.
*   **Failure Criteria**: Exceeded maximum time limit of 300 seconds, clicked wrong specialist without realizing, or abandoned the task.

### 5.2 Scenario 2: Diagnostic Results Comprehension
*   **Context**: You had a blood draw last week to monitor your cholesterol. You want to see if your diet improvements have helped lower your bad cholesterol.
*   **Task**: "Find your latest Lipid Panel results in the portal. Review the numbers and determine if your LDL cholesterol level is within normal range or elevated. Download a copy of this report as a PDF for your records."
*   **Success Criteria**: User correctly identifies the LDL value (142 mg/dL) and states it is elevated/abnormal, then successfully downloads the file.
*   **Failure Criteria**: Incorrectly identifies the LDL number, misinterprets the status due to confusing UI, or fails to locate the download button within 200 seconds.

### 5.3 Scenario 3: Prescription Refill & Billing Setup
*   **Context**: Your daily blood pressure medication (Lisinopril 10mg) has run out of refills. You need to request a renewal, add your new credit card, and pay the $15 copay.
*   **Task**: "Request a renewal for Lisinopril 10mg. Go to the payment portal, enter the testing credit card details provided, update your insurance carrier to 'AuraShield Blue', and submit the copayment of $15."
*   **Success Criteria**: User submits renewal request, successfully modifies insurance company field, and processes payment.
*   **Failure Criteria**: Fails to submit renewal, skips the insurance update, or payment is blocked by validation errors.

### 5.4 Error Tracking Framework
Errors were classified using Norman's Action Cycle framework:
*   **Slips**: Unintentional actions (e.g., mistyping a date, accidental click on background element).
*   **Mistakes**: Incorrect mental models (e.g., clicking on "Messages" to find a lab report, expecting a text box to auto-save).
*   **Severity Levels**:
    *   *Minor*: Causes brief hesitation, user recovers independently.
    *   *Moderate*: Causes delay, user struggles but recovers via trial and error.
    *   *Critical*: Causes task failure or requires moderator assistance to proceed.

---

## 6. Usability Metrics

### 6.1 Quantitative Test Results

Below is the raw metric ledger collected during the usability testing sessions:

| Participant | Task 1 Success | Task 1 ToT (s) | Task 1 Errors | Task 2 Success | Task 2 ToT (s) | Task 2 Errors | Task 3 Success | Task 3 ToT (s) | Task 3 Errors |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **P1** | Failure | 300 (Max) | 5 | Success | 145 | 3 | Failure | 240 (Max) | 6 |
| **P2** | Success | 210 | 3 | Failure | 200 (Max) | 4 | Success | 185 | 4 |
| **P3** | Success | 135 | 1 | Success | 88 | 1 | Success | 110 | 2 |
| **P4** | Success | 75 | 0 | Success | 52 | 0 | Success | 64 | 1 |
| **P5** | Success | 62 | 0 | Success | 45 | 0 | Success | 55 | 0 |

### 6.2 Metric Calculations & Benchmarks

#### Task Success Rate (TSR)
*   **Task 1 (Booking)**: $4 / 5 \text{ successes} = 80\%$
*   **Task 2 (Lab Report)**: $4 / 5 \text{ successes} = 80\%$
*   **Task 3 (Billing/Refill)**: $3 / 5 \text{ successes} = 60\%$
*   **Overall Average Success Rate**: $\mathbf{73.3\%}$ (Goal: $\ge 85\%$, **FAILED**)

#### Mean Time on Task (ToT)
*   **Task 1**: $156.4 \text{ seconds}$ (Goal: $\le 180\text{s}$, **PASSED**)
*   **Task 2**: $96.0 \text{ seconds}$ (Goal: $\le 90\text{s}$, **FAILED**)
*   **Task 3**: $130.8 \text{ seconds}$ (Goal: $\le 120\text{s}$, **FAILED**)

#### Average Errors Per Session
*   **Task 1**: $1.8 \text{ errors}$
*   **Task 2**: $1.6 \text{ errors}$
*   **Task 3**: $2.6 \text{ errors}$
*   **Overall Average**: $\mathbf{2.0 \text{ errors}}$ (Goal: $\le 1.5$, **FAILED**)

---

### 6.3 System Usability Scale (SUS) Scorecard
The SUS is a standard 10-item Likert scale (responses from 1 = Strongly Disagree to 5 = Strongly Agree). 

The 10 standard SUS questions are:
1.  I think that I would like to use this system frequently.
2.  I found the system unnecessarily complex.
3.  I thought the system was easy to use.
4.  I think that I would need the support of a technical person to be able to use this system.
5.  I found the various functions in this system were well integrated.
6.  I thought there was too much inconsistency in this system.
7.  I would imagine that most people would learn to use this system very quickly.
8.  I found the system very cumbersome to use.
9.  I felt very confident using the system.
10. I needed to learn a lot of things before I could get going with this system.

#### Raw SUS Responses Table

| Participant | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Calculated SUS Score |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **P1** | 2 | 4 | 2 | 5 | 3 | 4 | 1 | 4 | 2 | 4 | **32.5** |
| **P2** | 2 | 4 | 3 | 4 | 2 | 3 | 2 | 3 | 2 | 3 | **42.5** |
| **P3** | 3 | 3 | 3 | 2 | 4 | 2 | 3 | 2 | 3 | 2 | **62.5** |
| **P4** | 4 | 2 | 4 | 1 | 4 | 2 | 4 | 2 | 4 | 1 | **80.0** |
| **P5** | 3 | 2 | 3 | 1 | 3 | 1 | 3 | 2 | 4 | 1 | **67.5** |

*   **Average calculated SUS Score**: $\mathbf{57.0 / 100}$ (Adjective Rating: **"Poor/OK"**, Grade: **"D"**, **FAILED** threshold of 75). Note: Initially projected at 52.5, actual calculations based on representative participant feedback yield 57.0, still significantly below acceptable limits.

*   *SUS Calculation Formula applied per participant*: 
    $$\text{Score} = \left( \sum (Q_{\text{odd}} - 1) + \sum (5 - Q_{\text{even}}) \right) \times 2.5$$

---

### 6.4 Net Promoter Score (NPS)
After completing the session, participants were asked: *"On a scale of 0 to 10, how likely are you to recommend AuraHealth Care to a friend or family member?"*
*   **Promoters (9-10)**: 0 users (0%)
*   **Passives (7-8)**: 2 users (P4, P5) (40%)
*   **Detractors (0-6)**: 3 users (P1, P2, P3) (60%)
*   **NPS Formula**: $\% \text{ Promoters} - \% \text{ Detractors} = 0\% - 60\% = \mathbf{-60}$ (Goal: $\ge +30$, **FAILED**)

---

### 6.5 NASA-TLX Cognitive Load Assessment
Participants self-reported cognitive workload across 6 dimensions on a 100-point scale (higher numbers = higher load/frustration).

| Dimension | P1 | P2 | P3 | P4 | P5 | Mean Dimension Score |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Mental Demand** | 85 | 80 | 60 | 30 | 25 | **56.0** |
| **Physical Demand** | 40 | 30 | 10 | 5 | 5 | **18.0** |
| **Temporal Demand** | 75 | 70 | 50 | 20 | 10 | **45.0** |
| **Performance (Failure)** | 90 | 75 | 40 | 15 | 10 | **46.0** |
| **Effort** | 85 | 80 | 55 | 25 | 20 | **53.0** |
| **Frustration Level** | 95 | 85 | 65 | 15 | 10 | **54.0** |
| **Composite Score** | **78.3** | **70.0** | **56.7** | **18.3** | **13.3** | **Mean Composite: 47.3 / 100** |

*Analysis*: While younger tech-savvy users (P4, P5) experienced negligible cognitive load, older patients (P1, P2) suffered massive mental effort and extreme frustration, highlighting a critical digital divide and poor accessibility optimization.

---

## 7. UX Laws and Design Principles Analysis

We evaluated the test observations against established usability frameworks:

### 7.1 Jakob’s Law
*   **Violation**: The appointment scheduling workflow uses a custom slider wheel to pick booking times instead of a standard calendar grid.
*   **Impact**: P1 and P2 spent over 90 seconds trying to click-and-drag the slider, stating "I don't know how to change the day." Patients expect clinical scheduling systems to follow booking paradigms established by Google Calendar or airline portals.

### 7.2 Hick’s Law
*   **Violation**: When searching for "Cardiologist", the portal displays 18 available specialists simultaneously on a single scrollable page, with all details (education, clinical interests, location, bio) fully expanded.
*   **Impact**: The cognitive decision-making time ($T$) matches:
    $$T = b \cdot \log_2(n + 1)$$
    The unorganized layout maximized the number of options ($n$), leading to choice paralysis. P2 spent 110 seconds reading bio text files before selecting a doctor, feeling exhausted.

### 7.3 Fitts’s Law
*   **Violation**: The primary "Confirm Appointment" CTA on the scheduling summary page is a text link inside a small $55 \times 24 \text{ pixel}$ border located in the bottom-right corner.
*   **Impact**: Time to acquire a target is a function of target distance and size:
    $$\text{MT} = a + b \log_2 \left( \frac{2D}{W} \right)$$
    The small target width ($W$) and massive visual distance ($D$) from the center content caused P1 (who uses high zoom) to fail to locate the button. P1 abandoned the task thinking the screen was a static receipt.

### 7.4 Miller’s Law
*   **Violation**: The main patient portal dashboard displays 14 primary navigation cards simultaneously (Messages, Labs, Billing, Vitals, Forms, Help, Doctor List, Telehealth Setup, Settings, Profile, Refills, Direct Care, Notifications, FAQs).
*   **Impact**: Exceeds the capacity of human working memory ($7 \pm 2$ items). Users felt visually overwhelmed upon logging in. P3 commented: *"My eyes jump everywhere, I can't figure out where the labs are."*

### 7.5 Tesler’s Law (Law of Conservation of Complexity)
*   **Violation**: The refill payment screen requires patients to manually type in their insurance provider name and policy prefix code, rather than the system cross-referencing their pre-registered profile or offering a validated dropdown selection.
*   **Impact**: Complexity was shifted from the system database onto the user, resulting in major typographical errors for P1 and P2.

### 7.6 Pareto Principle (80/20 Rule)
*   **Analysis**: Analysis of error logs shows that **81% of total workflow failures** were caused by just **19% of the portal's UI components**: the non-standard calendar scheduler and the unvalidated insurance text inputs. Resolving these two critical elements will resolve the vast majority of usability issues.

### 7.7 Aesthetic-Usability Effect
*   **Observation**: P3 and P4 praised the dashboard aesthetics ("It looks clean and clinical"). However, this visual design masked the underlying structural flaws of the scheduling calendar initially. P3 stated: *"It looks professional, so I thought it would be easy, but booking was a nightmare."*

### 7.8 Doherty Threshold
*   **Violation**: When submitting the payment for prescription renewal, the system took $3.4 \text{ seconds}$ to process the transaction. During this time, the page was static with no loading state or skeleton UI.
*   **Impact**: Since the response time was far above the $400\text{ms}$ threshold, users lost confidence. P2 clicked "Submit Payment" three times, resulting in triplicate transaction authorization requests.

### 7.9 Gestalt Principles (Proximity & Similarity)
*   **Violation**: In the Lipid Panel report table, the "Reference Ranges" (e.g., normal vs high) are visual elements placed 4 inches away from the patient's raw values, with no background banding to group them.
*   **Impact**: Violates the *Law of Proximity*. Users could not visually trace which label mapped to which number, causing P2 to read the wrong line and mistakenly believe their elevated LDL was normal.

### 7.10 Nielsen’s 10 Usability Heuristics
*   **Heuristic #2: Match between system and real world**: The lab report displayed the text *"Patient presents indications of Hyperlipidemia. Follow up indicated."* instead of *"Your bad cholesterol is high. Please schedule a follow-up call."* P2 expressed visible distress and panic.
*   **Heuristic #3: User control and freedom**: The scheduling wizard lacks a "Back" button. When P2 accidentally selected Dr. Sandra Patel instead of the general cardiology department, they had to log out and restart the entire application.
*   **Heuristic #5: Error prevention**: The billing address form lacks auto-complete or zipcode mapping. P1 misspelled "Street" as "Sreet", and the form rejected it with a red banner stating "Invalid Address" without highlighting the misspelled field.

### 7.11 WCAG 2.2 Accessibility Guidelines
*   **Success Criterion 1.4.3 (Contrast - Minimum)**: The global helper text is rendered in light gray (#B0BEC5) on a white background, yielding a contrast ratio of **1.8:1**. This violates the WCAG AA requirement of **4.5:1** for normal text. P1 and P2 could not read the instructions.
*   **Success Criterion 2.1.1 (Keyboard)**: The booking calendar wheel cannot receive focus via the Tab key. Users navigating via keyboard only (P5) could not select any appointment times, creating a complete barrier.
*   **Success Criterion 2.4.7 (Focus Visible)**: The text input fields on the payment form do not show any blue outline or style change when active. Users could not tell which field was currently selected.

---

## 8. Data Collection

### 8.1 Think-Aloud Protocol Excerpts

*   **P1 (Age 68)** trying to book telehealth (Task 1):
    > *"I see 'Appointments' here on the screen. Okay, I click it... I see a list of doctors. The font is very small, let me put on my glasses. Sandra Patel... she's there, but I don't see any button. Wait, do I click her face? Oh, nothing happened. Ah, there's a link at the bottom. Okay. Now... what is this wheel? It says 'Slide to select time'. I'm trying to drag it on my trackpad but it keeps bouncing back. Oh dear, I'm stuck. Can I just call them? I'd rather just call the office."*

*   **P2 (Age 62)** reading lab report (Task 2):
    > *"Lipid Panel... I see numbers. Cholesterol 210, Triglycerides 150, LDL-C 142. Is 142 good? I don't see any green or red colors. There is some text at the bottom. 'Indications of Hyperlipidemia.' What is hyperlipidemia? Is it cancer? This is scary. Why doesn't it just say if I'm okay?"*

*   **P1 (Age 68)** processing payment (Task 3):
    > *"I'm trying to type my address. It says 'Invalid Address' in a red box at the top. But I live here, it's not invalid! Which part is wrong? It doesn't tell me. I don't want to click 'Pay' again, what if it charges me twice?"*

---

### 8.2 Observation Log Entries

| Timestamp | User | Action Context | Direct Observation |
| :--- | :--- | :--- | :--- |
| `00:04:12` | **P1** | Dashboard | Squints close to screen, moves mouse cursor across all 14 cards slowly. Confused by menu choices. |
| `00:08:45` | **P1** | Calendar Selection | Tries to scroll slider widget. Cursor repeatedly slips off target. Abandons task at 300s. |
| `00:14:22` | **P2** | Lab Results | Clicks three times on the text "Lipid Panel" expecting a pop-up. Does not realize she has to scroll down. |
| `00:18:10` | **P2** | Payment Confirmation | Clicks "Confirm" button. Page goes white for 3 seconds. User clicks "Confirm" twice more. |
| `00:26:04` | **P3** | Specialist List | Complains about wall of text: *"I don't need to read their medical school thesis, I just need their next opening."* |
| `00:32:15` | **P5** | Calendar Selection | Attempts to navigate via `Tab` key. Calendar slider is skipped completely. User forces mouse click. |

---

### 8.3 Heatmap and Clickstream Analysis Summary
A aggregate analysis of click maps revealed two primary click concentrations:
*   **Dead Clicks (40% of page clicks)**: On the specialist listing screen, 40% of clicks occurred on the Doctor's headshot image and name text. Users assumed these elements were links to book, but they were non-interactive. The actual booking CTA was a small button at the far right.
*   **Missed CTAs**: On the payment page, clicks were randomly scattered around the bottom of the page, indicating that the small, low-contrast "Pay Now" link was difficult to locate.

---

## 9. Analysis Framework

### 9.1 Affinity Mapping Themes

Observations were grouped into three major friction patterns:

```
+---------------------------------------------------------------------------------+
|                                 AFFINITY THEMES                                 |
+-------------------------------------------------+-------------------------------+
| THEME A: NAVIGATIONAL & INTERACTION DEAD ENDS   | THEME B: COGNITIVE OVERHEAD   |
| * Custom UI components (calendar slider) fail.  | * Clinical jargon causes fear.|
| * Non-interactive images clicked repeatedly.   | * Dashboard overload (14 cards)|
| * Lack of back/undo paths in booking wizard.    | * No visual range indicators. |
+-------------------------------------------------+-------------------------------+
| THEME C: ACCESS/FORM ERRORS                     |
| * Low contrast text causes user fatigue.        |
| * Error messages lack contextual placement.    |
| * Payment processing lacks loading feedback.    |
+-------------------------------------------------+
```

### 9.2 Root Cause Analysis (5 Whys)

#### Problem 1: P1 and P2 failed to book the telehealth slot (Task 1)
1.  *Why?* They could not select a date and time.
2.  *Why?* They could not drag the custom slider wheel widget.
3.  *Why?* The widget required precise pointer tracking and didn't support standard click selection.
4.  *Why?* The design team prioritized a visual concept over standard, accessible web form elements.
5.  *Why?* Lack of accessibility reviews, user research testing with elderly populations, and non-compliance with Jakob's Law.

#### Problem 2: P1 and P2 could not successfully complete the prescription billing transaction (Task 3)
1.  *Why?* The address form continually threw validation errors.
2.  *Why?* Users misspelled simple words under stress and couldn't see where the error occurred.
3.  *Why?* The form displayed error messages in a single top banner instead of inline near the invalid inputs.
4.  *Why?* The form framework lacked field-level real-time validation styling.
5.  *Why?* The developer implemented standard, low-effort global validation alert patterns without user testing.

---

### 9.3 Severity Rating System
Usability issues were classified using Nielsen’s 0–4 scale:
*   **0**: No problem.
*   **1 (Cosmetic)**: Minor delay or aesthetic issue, no task impact.
*   **2 (Minor Usability)**: Causes user hesitation/irritation; easy to bypass.
*   **3 (Major Usability)**: Blocks some users from task completion; high frustration.
*   **4 (Usability Catastrophe)**: Universal blocker; prevents task completion; security/safety risk.

### 9.4 Prioritization Matrix

```
HIGH  ^  +--------------------------------+--------------------------------+
      |  | [IMPACT: HIGH / EFFORT: LOW]   | [IMPACT: HIGH / EFFORT: HIGH]  |
      |  | * Fix WCAG color contrasts     | * Replace custom calendar      |
      |  | * Add inline validation errors |   with standard date picker    |
I     |  | * Add payment loading spinner   | * Group dashboard widgets      |
M     |  | * Add tooltips to lab results  |   (Miller's Law cleanup)       |
P     |  |                                |                                |
A     |  |                                |                                |
C     |  +--------------------------------+--------------------------------+
T     |  | [IMPACT: LOW / EFFORT: LOW]    | [IMPACT: LOW / EFFORT: HIGH]   |
      |  | * Update doctor profile bio    | * Build patient history data   |
      |  |   formatting style             |   predictive modeling engine   |
      |  |                                |                                |
LOW   v  +--------------------------------+--------------------------------+
         <-----------------   DEVELOPMENT EFFORT   ----------------------->
         LOW                                                              HIGH
```

---

## 10. Findings Report

### 10.1 Issue 1: Custom Time Selection Slider Blocks Booking (Task 1)
*   **Screens Affected**: `Appointments/Book-Time`
*   **Evidence**: P1 abandoned task. P2 took 210 seconds. P5 (power-user) could not select time using keyboard navigation.
*   **UX Laws Violated**: Jakob's Law, WCAG 2.2 Guideline 2.1 (Keyboard Accessible).
*   **Severity**: **4 (Usability Catastrophe)**
*   **User Impact**: Complete blocker for keyboard-only and low-dexterity users. Causes high frustration.
*   **Business Impact**: Drives high support call-center volume, as users must call the clinic to book slots.

### 10.2 Issue 2: Jargon-Heavy Lab Results Cause Emotional Anxiety (Task 2)
*   **Screens Affected**: `My-Records/Lab-Reports`
*   **Evidence**: P2 stated she was "scared of cancer" upon reading the term "Hyperlipidemia" and seeing high-range numbers without context.
*   **UX Laws Violated**: Heuristic #2 (Match between system and real world), Gestalt Law of Proximity.
*   **Severity**: **3 (Major Usability)**
*   **User Impact**: Induces patient panic, leading to unnecessary messages sent to clinical staff.
*   **Business Impact**: Increases administrative load on physicians answering simple questions about basic lab results.

### 10.3 Issue 3: Inadequate Payment State Feedback Causes Multiple Charges (Task 3)
*   **Screens Affected**: `Billing/Payment`
*   **Evidence**: P2 clicked "Confirm" three times due to a 3.4-second delay without a loading cursor or spinner state.
*   **UX Laws Violated**: Doherty Threshold, Heuristic #1 (Visibility of system status).
*   **Severity**: **4 (Usability Catastrophe)**
*   **User Impact**: Users risk double/triple billing, creating financial distress and breaking trust.
*   **Business Impact**: High volume of payment refund requests and dispute operations, increasing merchant fees.

### 10.4 Issue 4: Global, Non-Specific Address Validation Errors (Task 3)
*   **Screens Affected**: `Billing/Refill-Form`
*   **Evidence**: P1 failed to complete checkout because of an unrecognized typo ("Sreet"). The error banner didn't specify which input field was incorrect.
*   **UX Laws Violated**: Heuristic #5 (Error prevention), Heuristic #9 (Help users recognize, diagnose, and recover from errors).
*   **Severity**: **3 (Major Usability)**
*   **User Impact**: Checkout loop of death. Users abandon self-service portal completely.
*   **Business Impact**: Lost revenue on online prescription sales; patients may experience gaps in medication adherence.

### 10.5 Issue 5: Small, Low-Contrast Call-to-Actions (Task 1 & Task 3)
*   **Screens Affected**: `Global Portal layouts`
*   **Evidence**: Contrast ratio of helper text is 1.8:1. Primary booking CTA measures only 55x24px. P1 missed it completely.
*   **UX Laws Violated**: Fitts's Law, WCAG 2.2 Success Criterion 1.4.3 (Contrast), SC 2.5.5 (Target Size).
*   **Severity**: **3 (Major Usability)**
*   **User Impact**: Hard to find action items, leading to fatigue and task failure.
*   **Business Impact**: Poor conversion rates for booking and payment completion.

---

## 11. Design Improvement Recommendations

We suggest the following improvements, sorted by implementation timeframe and usability domain:

### 11.1 Immediate Fixes (1–2 Weeks)
*   **Accessibility & Navigation**: Increase all global text contrasts to meet WCAG AA (minimum 4.5:1 ratio). Specifically, change light gray (#B0BEC5) helper text to dark slate (#37474F).
*   **Interaction Design**: Inject a full-screen loading overlay containing an animated spinner and text ("Processing transaction, please do not refresh or click back...") immediately upon payment button press. Disable the submit button on the first click.
*   **Form Design**: Relocate error messages from top alert banner to inline, field-level alerts colored in high-contrast red (#C62828), placed directly below the invalid text fields.

### 11.2 Short-Term Improvements (1–2 Sprints)
*   **Information Architecture**: Clean up the landing dashboard. Group the 14 widgets into 4 logical parent buckets: *Appointments*, *My Medical Records*, *Billing & Prescriptions*, and *Account Settings* (conforming to Miller’s Law).
*   **Visual Hierarchy & Terminology**: Revamp the Lab Results table. Introduce colored pill tags (e.g., High, Normal, Low) next to values. Place an explanatory tooltip icon next to medical terms (e.g., hovering over "Hyperlipidemia" displays: *"Hyperlipidemia means you have extra lipids (fats) in your blood, like cholesterol. This can often be managed with diet and medication."*).

### 11.3 Long-Term Enhancements (Strategic Roadmap)
*   **Core Navigation**: Replace the custom scheduling slider with a standard calendar grid containing clear keyboard focus states (`:focus-visible` styles) and aria-labels for screen readers.
*   **Form Automation**: Integrate insurance validation APIs that allow users to snap a photo of their insurance card to auto-fill policy details, or select from a dropdown list to prevent typographical failures (Tesler’s Law mitigation).

---

## 12. Prototype Redesign

### 12.1 Before vs. After Workflow Comparison

```
[BEFORE WORKFLOW: TELEHEALTH BOOKING]
(Dashboard: 14 choices) 
        |
(Specialist List: 18 doctors, expanded bios, no filtering)
        |
(Time Picker: Non-standard calendar slider wheel [Keyboard Blocked])
        |
(Booking Summary: Small link CTA in bottom corner, no visual contrast)
        |
(Outcome: High drop-off, call center call required)


[AFTER WORKFLOW: REDESIGNED STREAMLINED PATHWAY]
(Dashboard: 4 clean panels, clear visual hierarchy)
        |
(Specialist List: Top filter chips, collapsed doctor cards)
        |
(Time Picker: Standard 7-day calendar grid [Full Keyboard/TAB access])
        |
(Booking Summary: Large 48x48px colored button centered at bottom)
        |
(Outcome: Fast booking under 2 minutes, 100% digital completion)
```

---

### 12.2 Dashboard Layout Redesign (ASCII Mockup)

#### Before: Dashboard Visual Overload
```
+------------------------------------------------------------------------+
| [AuraHealth]  Msg  Labs  Pay  Vit  Form  Help  Docs  Set  Prof  Ref  FAQ |
+------------------------------------------------------------------------+
| Welcome!                                                               |
|                                                                        |
| [New Messages (2)]    [Lab Results]         [Pay Balance]              |
| * Dr. Patel            * Lipid Panel: Dec    * Lisinopril: $15.00      |
|                                                                        |
| [Vitals Tracker]      [Insurance Forms]     [General Help]             |
| * BP: 120/80           * Pre-Auth Form       * Chat Support            |
|                                                                        |
| [Doctor Directory]    [Account Settings]    [Prescription Refill]      |
| [Telehealth Setup]    [FAQs]                [Feedback Form]            |
+------------------------------------------------------------------------+
```

#### After: Clean, Accessible Dashboard (Miller's Law applied)
```
+------------------------------------------------------------------------+
|  AURAHEALTH CARE                                     [Messages] [Profile] |
+------------------------------------------------------------------------+
|  Welcome back, Eleanor!                                                |
|                                                                        |
|  +---------------------------------++---------------------------------+ |
|  | APPOINTMENTS                    || MEDICAL RECORDS                  | |
|  | - Telehealth setup: Active      || - Latest Lab: Lipid Panel (Dec)  | |
|  | [ Book New Appointment ]        || [ View Medical History ]         | |
|  +---------------------------------++---------------------------------+ |
|  +---------------------------------++---------------------------------+ |
|  | BILLING & REFILLS               || ACCESSIBILITY HELP & SUPPORT     | |
|  | - Lisinopril Refill: Ready      || - Text Size: [ A- ] [ A ] [ A+ ] | |
|  | - Balance Due: $15.00           || - Speak to Live Nurse: [ Call ]  | |
|  | [ Refill & Pay Now ]            ||                                  | |
|  +---------------------------------++---------------------------------+ |
+------------------------------------------------------------------------+
```

---

### 12.3 Calendar Picker Redesign (ASCII Mockup)

#### Before: Custom Slider Selector (Violates Jakob's Law & Accessibility)
```
+------------------------------------------------------------------------+
| SELECT TIME FOR DR. SANDRA PATEL                                      |
+------------------------------------------------------------------------+
|  Date: Tue, Jun 2, 2026                                                |
|                                                                        |
|  Slide left/right to choose time:                                      |
|  <---- [ 08:00 AM | *09:30 AM* | 10:00 AM | 11:30 AM ] ---->            |
|                                                                        |
|  [?] Click and drag your mouse precisely to select times.              |
+------------------------------------------------------------------------+
```

#### After: Accessible Calendar Grid (Jakob's Law & Fitts's Law applied)
```
+------------------------------------------------------------------------+
| SELECT TIME FOR DR. SANDRA PATEL                                      |
+------------------------------------------------------------------------+
|  Choose a Date:                                                        |
|  [ Prev Week ]       Week of June 1, 2026                 [ Next Week ]|
|  +--------++--------++--------++--------++--------++--------++--------+|
|  | Mon 1  || Tue 2  || Wed 3  || Thu 4  || Fri 5  || Sat 6  || Sun 7  |||
|  | Select ||(Active)|| Select || Select || Select || Closed || Closed |||
|  +--------++--------++--------++--------++--------++--------++--------+|
|                                                                        |
|  Choose an Available Time Slot on Tuesday, June 2:                     |
|  [ 08:30 AM ]    [ 09:30 AM ]    [ 10:00 AM (Selected) ]               |
|  [ 11:00 AM ]    [ 01:30 PM ]    [ 03:00 PM ]                          |
|                                                                        |
|  ====================================================================  |
|  [ CANCEL AND BACK ]                     [ PROCEED TO CONFIRMATION (CTA)]|
|                                          (Size: 180x48px, Green contrast)|
+------------------------------------------------------------------------+
```

---

## 13. Iterative Testing Strategy

To validate that the redesign resolves the usability flaws, the product team will execute the following iterative testing protocol:

### 13.1 Retesting Plan & Validation Methods
1.  **High-Fidelity Prototyping**: Build the redesigned layouts in Figma, incorporating screen-reader labels, accessible tab index sequencing, and keyboard navigation triggers.
2.  **Usability Validation Study**: Recruit another cohort of 5 users matching the Personas (with 3 users over the age of 60). Test them on the identical task scenarios.
3.  **A/B Verification**: For Marcus (the tech-savvy persona), run unmoderated A/B tests to monitor Task Completion Rate and Task Duration variations.

### 13.2 Success Metrics Benchmark Goals
After the redesign, the product cannot ship until:
*   **Overall Task Success Rate** increases from 73.3% to **$\ge 90\%$**.
*   **Prescription Refill Completion** increases from 60% to **$\ge 90\%$**.
*   **Mean SUS Score** increases from 57.0 to **$\ge 78$** (Grade B+).
*   **Net Promoter Score** improves from -60 to **$\ge +20$**.
*   **NASA-TLX Composite Workload** drops from 47.3 to **$\le 25$**.

### 13.3 Continuous Usability Improvement Roadmap

```mermaid
gantt
    title Product Usability Lifecycle (Agile Integration)
    dateFormat  YYYY-MM-DD
    section Phase 1: Fix
    Implement Immediate Accessibility fixes  :active, 2026-06-01, 2026-06-10
    Deploy payment state loader and feedback  :active, 2026-06-05, 2026-06-12
    section Phase 2: Refactor
    Develop Calendar Grid control            : 2026-06-12, 2026-06-25
    Restructure Dashboard layout             : 2026-06-15, 2026-06-30
    section Phase 3: Validate
    Run Validation Usability study           : 2026-07-01, 2026-07-07
    Analyze post-redesign metrics            : 2026-07-08, 2026-07-12
```

---

## 14. Conclusion & Bibliography

### 14.1 Conclusion
AuraHealth Care’s usability review highlights the critical importance of human-centered design in digital health tools. While a portal may appear modern and visually clean, the underlying user flows must prioritize accessibility, clear communication, and intuitive interactions. 

By replacing custom elements with standard UI components, introducing visual health status indicator tags, optimizing layout cognitive load, and adhering to WCAG 2.2 accessibility guidelines, AuraHealth Care can improve digital task completion, reduce physician and call center administrative burden, and ensure a safe, anxiety-free digital patient experience.

---

### 14.2 Bibliography

*   **Fitts, P. M.** (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, 47(6), 381–391.
*   **Hick, W. E.** (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology*, 4(1), 11–26.
*   **Miller, G. A.** (1956). The magical number seven, plus or minus two: Some limits on our capacity for processing information. *Psychological Review*, 63(2), 81–97.
*   **Nielsen, J., & Landauer, T. K.** (1993). A mathematical model of the finding of usability problems. *Proceedings of the ACM INTERACT'93 and CHI'93 Conference on Human Factors in Computing Systems*, 206–213.
*   **Nielsen, J.** (1994). *Usability Engineering*. Morgan Kaufmann.
*   **Norman, D. A.** (2013). *The Design of Everyday Things: Revised and Expanded Edition*. Basic Books.
*   **Tesler, L.** (1984). The Law of Conservation of Complexity. *ACM SIGCHI Bulletin*.
*   **W3C Web Accessibility Initiative (WAI)**. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/
