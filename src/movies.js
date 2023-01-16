
// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?

function getAllDirectors(moviesArray) {
    const directors = moviesArray.map(director => director.director)
    const uniqueDirectors = directors.filter((director,index) => directors.indexOf(director) === index)
    return uniqueDirectors;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    let count = 0;
    const stevenArr = moviesArray
        .filter(movies => movies.director === "Steven Spielberg")
        .map(item => item.genre.map(genre => genre === 'Drama' ? count++ : count))

    return count;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {

    if(moviesArray.length < 1) {
        return 0
    }

    const scores = moviesArray.map(item => ('score' in item) && typeof item.score === 'number' ? item.score : item.score = 0);
    
    const scoresAv = scores.reduce((ac, cur) => ac + cur)  / scores.length  

    const average = Math.round( scoresAv * 100) / 100;
    
    return average
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    
    const dramaArray = moviesArray.filter(item => item.genre.includes("Drama"));
    
    if (dramaArray.length < 1) {
        return 0;
    }

    const scores = dramaArray.map(item => ('score' in item) && typeof item.score === 'number' ? item.score : item.score = 0);
    
    const scoresAv = scores.reduce((ac, cur) => ac + cur)  / scores.length  

    const average = Math.round( scoresAv * 100) / 100;
    
    return average
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {

    const newArr = JSON.parse(JSON.stringify(moviesArray));

    newArr.sort((prev, cur) => {

        if (prev.year === cur.year) {
            if (prev.title < cur.title) {
                return -1
            } return 0
        } return prev.year - cur.year

    })

    return newArr;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {

    const newArr = JSON.parse(JSON.stringify(moviesArray));

    const arrOf20 = [];
    
    const onlyTitle = newArr.map(movie => movie.title).sort();
        
    onlyTitle.forEach(item =>{ 
        if(arrOf20.length < 20) { 
            arrOf20.push(item)
        }
    })

    return arrOf20
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    
    const newArr = JSON.parse(JSON.stringify(moviesArray));
    
    const minutesArr = newArr.map(movie => {
        
        let minutes = 0;
        let hoursInMin = 0;

        let duration = movie.duration.split(" ")
            .map(item => {

                if(item.match(/h/)){
                    const hour = item.split("h");
                    hoursInMin = parseInt(hour[0]) * 60;
                    return hoursInMin
                } else if(item.match(/min/)) {
                    const min = item.split("min");
                    minutes += parseInt(min[0]);
                    return minutes
                }
            })
            .reduce((ac, cur) => ac + cur)

        movie.duration = duration

        return movie
    })

    return minutesArr;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
   
    const duplicateAvr = [];

    const newArr = JSON.parse(JSON.stringify(moviesArray));

    newArr.forEach((item) => {
        
        let year = item.year;

        const yearArr = newArr.filter(item => item.year == year)

        let numAv = yearArr
            .map(item => ('score' in item) && typeof item.score === 'number' ? item.score : item.score = 0)
            .reduce((ac, cur) => ac + cur)  / yearArr.length

        let average = Math.round(numAv * 100) / 100
 
        duplicateAvr.push({
            year: year,
            average: average
        })
              
    })

    const finalArr = duplicateAvr.filter((item, index) => duplicateAvr.findIndex(year => item.year === year.year) === index)
    
    finalArr.sort((a, b) => b.average - a.average)

    if (finalArr.length < 1) {
        return null
    } else {
        const oldest = finalArr.filter((item) => item.average === finalArr[0].average);
        oldest.sort((a,b) => a.year - b.year)

        return `The best year was ${oldest[0].year} with an average score of ${oldest[0].average}`
    }
        
}
