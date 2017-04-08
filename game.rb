class Player
  attr_reader :marker, :name
  attr_accessor :guess

  @@player_num = 0

  def initialize
  	@@player_num += 1
  	setup
  end

  def setup
  	puts "Please enter your name Player #{@@player_num}"
  	@name = gets.chomp
  	@guess = Array.new
  	@marker = @@player_num === 1 ? "X" : "O"
  end
end


class Board
  Wins = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]

  def initialize
  	@cells = *(0..9)
  	@cells[0] = nil
  end

  def draw
  	puts "\n"
  	puts "#{@cells[1]} | #{@cells[2]} | #{@cells[3]}"
  	puts "---+---+---"
  	puts "#{@cells[4]} | #{@cells[5]} | #{@cells[6]}"
  	puts "---+---+---"
  	puts "#{@cells[7]} | #{@cells[8]} | #{@cells[9]}"
  end

  def turn(player, guess)
  	if guess < 1 || guess > 9
  		puts "Only numbers on the board"
  		return false
  	elsif ["X", "O"].include? @cells[guess]
  		puts "Spot is already taken"
  		return false
  	end
  	@cells[guess] = player.marker
  	player.guess << guess
  end

  def check_win(moves)
  	Wins.each do |w| 
  		return true if w.select{|i| moves.include? i }.count ==3
  	end
  	false
  end
end

class Game
  def initialize
	@player = []
	@player << Player.new << Player.new
	@board = Board.new
	@turn_num = 0
  end

  def play
  	@board.draw

  	while true
  		puts "\n #{@player[@turn_num].name} place your move"
  		move = gets.chomp.to_i
  		if @board.turn(@player[@turn_num], move)
  			@board.draw
  			if @board.check_win(@player[@turn_num].guess)
  				puts "\n #{@player[@turn_num].name} wins"
  				break
  			elsif @player[@turn_num].guess.count > 4
  				puts"\n Draw"
  				break
  			end
  			@turn_num = (@turn_num == 0 ? 1 : 0)
  		end
  	end
  end
end


Game.new.play