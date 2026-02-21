def calculate_risk(probability):
    score = int(probability * 100)
    if score > 75:
        level = "High Risk"
    elif score > 40:
        level = "Medium Risk"
    else:
        level = "Low Risk"
    return score, level