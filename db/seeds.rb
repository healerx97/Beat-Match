require 'faker'

puts "Destroying data"

User.destroy_all
User.reset_pk_sequence
Track.destroy_all
Track.reset_pk_sequence
Match.destroy_all
Match.reset_pk_sequence
LikedUser.destroy_all
LikedUser.reset_pk_sequence
Tag.destroy_all
Tag.reset_pk_sequence
TrackTag.destroy_all
TrackTag.reset_pk_sequence

puts "Creating data"

10.times do
    User.create(username: Faker::Internet.username, user_type: "Rapper", age: rand(18..55), bio: "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor", image_url: Faker::Avatar.image, password: "asdf")
end

10.times do
    User.create(username: Faker::Internet.username, user_type: "Producer", age: rand(18..55), bio: "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor", image_url: Faker::Avatar.image, password: "asdf")
end

songs = ["https://soundcloud.com/ghun-kenny-yoon/410a", "https://soundcloud.com/ghun-kenny-yoon/euvn2", "https://soundcloud.com/ghun-kenny-yoon/218a", "https://soundcloud.com/ghun-kenny-yoon/116a", "https://soundcloud.com/ghun-kenny-yoon/rewt", "https://soundcloud.com/ghun-kenny-yoon/108a", "https://soundcloud.com/ghun-kenny-yoon/106a", "https://soundcloud.com/ghun-kenny-yoon/928a", "https://soundcloud.com/ghun-kenny-yoon/nxn2", "https://soundcloud.com/ghun-kenny-yoon/mix1"]

User.all.each do |r|
    Track.create(user_id: r.id, title: Faker::Ancient.god, song_url: songs.sample)
end

Tag.create(genre: "ALL")
Tag.create(genre: "pop")
Tag.create(genre: "country")
Tag.create(genre: "hip-hop")
Tag.create(genre: "house")
Tag.create(genre: "techno")
Tag.create(genre: "alt")

genres = Tag.select{|t| t.genre != "ALL"}
genre_ids = genres.map{|g| g.id}

Track.all.each do |t|
    TrackTag.create(track_id: t.id, tag_id: genre_ids.sample)
end


# LikedUser.create(liked_user_id: 5, user_id: 13)
# LikedUser.create(liked_user_id: 13, user_id: 5)
# LikedUser.create(liked_user_id: 4, user_id: 13)
# LikedUser.create(liked_user_id: 13, user_id: 4)
# LikedUser.create(liked_user_id: 1, user_id: 2)
# LikedUser.create(liked_user_id: 2, user_id: 1)
# LikedUser.create(liked_user_id: 1, user_id: 2)
# LikedUser.create(liked_user_id: 7, user_id: 1)
# LikedUser.create(liked_user_id: 9, user_id: 1)


# Match.create(rapper_id: 5, producer_id: 13)


# Match.create(rapper_id: 1, producer_id: 12)
# Match.create(rapper_id: 2, producer_id: 13)
# Match.create(rapper_id: 2, producer_id: 14)
# Match.create(rapper_id: 3, producer_id: 15)
# Match.create(rapper_id: 3, producer_id: 16)
# Match.create(rapper_id: 4, producer_id: 17)
# Match.create(rapper_id: 4, producer_id: 18)
# Match.create(rapper_id: 5, producer_id: 19)
# Match.create(rapper_id: 5, producer_id: 20)
# Match.create(rapper_id: 6, producer_id: 11)
# Match.create(rapper_id: 6, producer_id: 12)
# Match.create(rapper_id: 7, producer_id: 13)
# Match.create(rapper_id: 7, producer_id: 14)
# Match.create(rapper_id: 8, producer_id: 15)
# Match.create(rapper_id: 8, producer_id: 16)
# Match.create(rapper_id: 9, producer_id: 17)
# Match.create(rapper_id: 9, producer_id: 18)
# Match.create(rapper_id: 10, producer_id: 19)
# Match.create(rapper_id: 10, producer_id: 20)

puts "Done :)"