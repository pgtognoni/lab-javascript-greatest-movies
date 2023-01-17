
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
        
        let timeInMin = 0;

        movie.duration.split(" ")
            .map(item => {

                if(item.match(/h/)) {
                    const hour = item.split("h");
                    timeInMin += parseInt(hour[0]) * 60;
                    
                } else if(item.match(/min/)) {
                    const min = item.split("min");
                    timeInMin += parseInt(min[0]);
                    
                }
            })
            
        movie.duration = timeInMin

        return movie
    })

    return minutesArr;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
   
    //1st. Make a copy or the original Array
    const newArr = JSON.parse(JSON.stringify(moviesArray));
    
    const yearsAvr = [];
    const years = [];

    //Loop the new Array
    newArr.forEach((item) => {
        
        let year = item.year;

        if(years.includes(year)) {
            //to prevent duplicate values in new array of obj
            return
        } else {
            
            years.push(year);
            
            //Make a new Array where movies are filter by the YEAR
            const yearArr = newArr.filter(item => item.year == year)

            //Calculate the average socre in movies of the same year
            let numAv = yearArr
                .map(item => ('score' in item) && typeof item.score === 'number' ? item.score : item.score = 0)
                .reduce((ac, cur) => ac + cur)  / yearArr.length
    
            let average = Math.round(numAv * 100) / 100
            //Create a new object with the year and the average and push it to the array
            yearsAvr.push({
                year: year,
                average: average
            })
        }
              
    })
    
    //sort the array to keep on the top the highest score values;
    yearsAvr.sort((a, b) => b.average - a.average)
    

    if (yearsAvr.length < 1) {
        return null
    } else {
        //if more than 1 object have the same average sort them to have the oldest
        const oldest = yearsAvr.filter((item) => item.average === yearsAvr[0].average);
        oldest.sort((a,b) => a.year - b.year)

        return `The best year was ${oldest[0].year} with an average score of ${oldest[0].average}`
    }
        
}
