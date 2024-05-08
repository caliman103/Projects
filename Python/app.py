inventory = ["apples", "oranges", "bananas", "pears", "oats", "peas", "kiwis", "potatoes"]
badItems = []

basket = list(map(str, input("Enter the items you want:\n").split(", ")))

#checking items
for i in range(len(basket)):
    try:
        inventory.index(basket[i])
    except:
        badItems.append(basket[i])

#letting user know if there are some items unavailable
if(len(badItems) > 0):
    print("\n")
    if(len(badItems) == 1):
        removedItems = ''.join(badItems)
        print('Unfortunately we do not sell ' + removedItems + "\n")
    else:
        removedItems = ', '.join(badItems)
        for i in range(len(removedItems)-1,0, -1):
            if(removedItems[i] == ' '):
                test = removedItems[:i] + ' or ' + removedItems[i:]  
                break 
        print('Unfortunately we do not sell ' + test + "\n")

#removing items from basket
if(len(badItems) > 0):
    for i in range(len(badItems)):
        basket.remove(badItems[i])

userBasket = ', '.join(basket)
print("Your basket contains " + userBasket + "\n")