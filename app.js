function minimalHeaviestSet(arr) {
  //^ get own copy of original array.
  orgArr = [];
  orgArr = [...arr];

  //^ create msg variable
  let msg;
  
  //^ initialize boxes
  const boxA = [];
  let a = 0;
  const boxB = [];
  let b = 0;
  const boxC = [];
  let c = 0;
  const boxD = [];
  let d = 0;

  //^ pull total number from array
  const ttlPkg = orgArr.shift();

  //^ index array for evalHeaviest method./meetings/1624790219
  const heaviestIndices = [];

  //^ init diff values for create boxes function
  let commonDiff = 0;
  let altDiff = 0;

  //^ sort so heaviest is first
  orgArr.sort((a, b) => b - a);

  //^ create function to grab heaviest pkg. Add add all others, then compare the two. Return boxes if all others in list weigh less than heaviest. Consider that no package will weigh under 1 lb. So only loop through as many items in remaining list that are as many as the heaviest value. Example: if the heaviest item is 8, then only loop through 8 or less items. Check for this condition and return for further work if items are greater than the heaviest weight.
  const evalHeaviest = () => {
    //^ create different array to work from and not effect orgArr
    const orgArrA = [...orgArr];

    //! pull heaviest package
    //@ remove heaviest for this process, reason for new array because if this fails, the next process needs this in place in array.
    const heaviestPkg = orgArrA.shift();
    console.log(heaviestPkg)
    console.log(orgArrA.length)
    if (heaviestPkg >= 50) {
      let msg = [
        "Package 50 lbs or over found. Please remove from list and ship separately",
      ];
      return msg;
    } else if (orgArrA.length === 1 && orgArrA[0] <= heaviestPkg) {
      msg = "Short list Evaluated";
      boxA.push(heaviestPkg);
      boxB.push(orgArrA[0]);
      return [msg, ...boxA, ...boxB];
    } else if (orgArrA.length > heaviestPkg) {
      let msg = ["Returning to main. No need for me."];
      return msg;
    } else {
      //^ set a start index of for loop in case that the loop fails, we can use that info later.
      heaviestIndices.push(orgArrA.indexOf(orgArrA[0]));

      let sum = 0;
      let prevSum = 0.5;
      let runCount = 0;

      for (let i = 0; i < heaviestPkg; i++) {
        if (sum < heaviestPkg) {
          if (sum !== prevSum) {
            prevSum = sum;
            sum = (orgArrA[i] ? orgArrA[i] : 0) + sum;
            runCount = i;
          }
        }
      }
      //^ use the runCount for the end indices
      heaviestIndices.push(runCount);

      //^ pack boxes or return
      if ((runCount === orgArrA.length) || ((sum === heaviestPkg) && (runCount <= heaviestPkg) && (orgArrA.length <= (heaviestIndices[1] + 1)) )) {
        boxA.push(heaviestPkg);
        boxB.push(sum);
      }
    }
  };

  const createTwoBoxes = () => {
    //^ create setA
    for (let i = 0; i <= orgArr.length / 2 - 1; i++) {
      if (orgArr[i] >= 50) {
        msg = ["check that all box weights are under 50 lbs"];
        return msg;
      } else {
        boxA.push(orgArr[i]);
      }
    }
    console.log('boxA: ', boxA);
    //^ create setB from the rest
    if (boxA.length) {
      boxB.push(...orgArr.filter((item, i) => item !== boxA[i]));
    } else {
      msg = ["check that all box weights are 50 lbs or under"];
      return msg;
    }
    console.log("boxB: ", boxB);
    //^ calculate the totals for sets
    const calcTotal = (grp) => {
      const ttl = grp.reduce((acc, curVal) => acc + curVal);

      if (ttl >= 50) {
        msg = [
          "total weights exceeded 50 lbs, please check the numbers and try your pack again.",
        ];
        boxA.splice(1, boxA.length);
        boxB.splice(1, boxB.length);
        return msg;
      }
      return ttl;
    };

    a = calcTotal(boxA);
    b = calcTotal(boxB);

    //^ get the difference between the two
    commonDiff = Math.abs(a - b);

    //^ handle no diff
    if (commonDiff <= 0 && a + b <= 100) {
      msg = ["Yahtzee!"];
      return [msg, ...boxA, ...boxB];
    } else {
      //> create the alternative sets
      //^ get the last from boxA, create clone
      boxC.push(...boxA);
      const oddBallA = boxC.pop();

      //^ get the first from boxB, create clone
      boxD.push(...boxB);
      const oddBallB = boxD.shift();

      //^ add oddBallB to boxC (boxA clone)
      boxC.push(oddBallB);

      //^ add oddBallB to boxD (boxB clone)
      boxD.push(oddBallA);
      //^ calc new groups
      c = calcTotal(boxC);
      d = calcTotal(boxD);

      //^ get the difference to compare
      altDiff = Math.abs(c - d);
    }
  };

  evalHeaviest();
  if ((boxA.length && boxB.length)) {
    msg = "Short list Evaluated";
    return [`${msg} | [${boxA}] | [${boxB}]`];
  } else {
    createTwoBoxes();
    //^ return whats best
    if (commonDiff < altDiff) {
      if (a > b) {
        msg = "First Evaluation";
        return [`${msg} | [${boxA}]- ttl:${a} | [${boxB}]- ttl:${b} `];
      } else {
        return msg;
      }
    } else {
      if (c > d) {
        msg = "Second Evaluation";
        return [`${msg} | [${boxC}]- ttl:${c} | [${boxD}]- ttl:${d} `];
      } else {
        return [`${msg} | [${boxA}]- ttl:${a} | [${boxB}]- ttl:${b} `];
      }
    }
  }
}

//^ Single group
const data1 = [1, 5];

//^ Double group
const data2 = [2, 3, 7];

//^ Double of same weights - this is built and returned in eval heaviest. Compare condition accounts for length
const data2a = [2, 7, 7];

//^ Triple with close weights
const data3 = [3, 10, 5, 4];

//^ Triple with matching additive weights
const data3a = [3, 10, 5, 5];

//^ Four with close weights
const data4 = [4, 10, 3, 5, 1];

//^ Four with matching additive weights - eval heaviest or in last if statement
const data4a = [4, 10, 3, 5, 2];

//^ 5
const data5 = [5, 6, 3, 1, 4, 2];
//^ 5 with matching additives
const data5a = [5, 6, 2, 1, 1, 2];

const data6 = [6, 5, 3, 2, 4, 1, 2];
const data7 = [7, 5, 3, 2, 4, 1, 2, 6];
//^ Difference between groups is 0
const data7a = [7, 5, 3, 5, 4, 5, 5, 7];

//^ over 50 lb
const data50a = [
  51, 52, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1,
];

//^ heavy pkg is smaller than rest of group.
const data50b = [
  51, 48, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1,
];

//^ fails first stage because there are still weights to count after match
const data50c = [
  48, 48, 10, 10, 10, 10, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

//^ limit is 49 lbs. Error msg if 50 for either
const data50 = [5, 49, 25, 10, 10, 4]

console.log(minimalHeaviestSet(data50));
