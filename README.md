# AverageShippingWeights
This is a javascript function that takes in an array of package weights and splits them into two boxes with weights that are most comparable and under 50 lbs.

Amazon wants to ship package better. They will give the number of packages, along with the package weights in an array. The first number in the array is the number of packages and all the other following numbers are the individual package weights.

Create a function that breaks the list into two shipping boxes where box A will be heaviest but comparable to box B.

example: given the array [6, 5, 3, 2, 4, 1, 2] - there are 6 packages to ship. Box A could be [5, 4] at 9lb or [5, 3] at 8 lbs and box B [2,1,2,3] at 8 lb or [2,1,2,4] at 9lb but in this case box A [5,4] is the only option because box A [5,3] is lighter than box B [2,1,2,4]

You may notice the funny syntax of the comments. I use the "better comments" extension for vsCode. The highlight color I use is:
  {
    "tag": "^",
    "color": "#FFFF00",
    "strikethrough": false,
    "underline": false,
    "backgroundColor": "transparent",
    "bold": false,
    "italic": true
  },
  {
    "tag": ">",
    "color": "#C68BFF",
    "strikethrough": false,
    "underline": false,
    "backgroundColor": "transparent",
    "bold": false,
    "italic": false
  },
  {
    "tag": "@",
    "color": "#FF8C00",
    "strikethrough": false,
    "underline": false,
    "backgroundColor": "transparent",
    "bold": false,
    "italic": false
  }
These objects are with the settings json of vsCode if you have the extension
