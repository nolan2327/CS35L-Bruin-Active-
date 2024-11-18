from sum_people_functions import sum_people, calculate_Percentage
import json  # Keeping the import from the merged branch

wooden_occupancy = sum_people(1)
bfit_occupancy = sum_people(0)

# Example usage of calculate_Percentage
max_population = 1000  # Adjust this as needed
wooden_percentage = calculate_Percentage(max_population, wooden_occupancy)
bfit_percentage = calculate_Percentage(max_population, bfit_occupancy)

print(f"Wooden Occupancy: {wooden_occupancy}")
print(f"Wooden Occupancy Percentage: {wooden_percentage}%")
print(f"BFit Occupancy: {bfit_occupancy}")
print(f"BFit Occupancy Percentage: {bfit_percentage}%")
