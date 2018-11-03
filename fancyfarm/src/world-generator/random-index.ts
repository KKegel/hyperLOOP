export function getRandomIndex(probabilities: number[]): number {
  const r =  Math.random();

  const sum = probabilities.reduce((agg, x) => agg+x, 0);
  if(sum === 0) {
    throw Error('sum is zero')
  }

  const normProb = probabilities.map(x => x/sum);

  let lastP = 0.0;
  for(let i=0; i < normProb.length; i++) {
    const p = normProb[i];
    if(lastP < r && r < (lastP+p)) {
      return i;
    } else {
      lastP += p;
    }
  }
  // If algorith fails: retry!
  return getRandomIndex(probabilities)
}