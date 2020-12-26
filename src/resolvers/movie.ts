import {MovieInfo} from "../types";
import {Movie} from '../models/movies';

export default {
    
    Query:{
        async getMovies(_: void, args: any):Promise<MovieInfo>{
            let sortBy = "";
            sortBy = args.sortBy ? args.sortBy.split(",").join(" ") : " ";

            const getAllMovies = await Movie.find().sort(sortBy)
            if(!getAllMovies){
                throw new Error("No movies saved")
            }
            return getAllMovies;

        },
        async getSelectedMovie(_:void, args: any): Promise<MovieInfo>{
            const {id} = args;
            const movie = await Movie.findById(id);
            return movie;
        }
    },
    Mutations:{
        async addMovie(_:void, args:any):Promise<MovieInfo>{

            const { name,releaseDate,userId, duration,imageURL ,actors } = args;
            const newMovie = new Movie({
                userId,
                name,
                releaseDate,
                duration,
                actors,
                averageRating: 0,
                imageURL
            }).save()

            return newMovie;


        },
        async updateMovie(_:void, args:any):Promise<MovieInfo>{

            const {id,reactions} = args;
            const findMovieRate = await Movie.findById(id).then((movie:any) => movie.reactions.map((reactions:any)=>reactions.rating))
            const average = Math.round(findMovieRate.reduce((a:any,b:any )=>a+b)/findMovieRate.length);
            const movieToUpdate = await Movie.findByIdAndUpdate(id,{
                $set:{averageRating: average},
                $push:{reactions: reactions}
            })
            return movieToUpdate        
            
        },
        async deleteMovie(_:void, args:any ):Promise<boolean>{
            console.log(args)
            const {id}= args;
            const movie = await Movie.findByIdAndDelete(id);
            if(!movie) throw new Error("This movie does not exists")
            return true
        }

    }

}





