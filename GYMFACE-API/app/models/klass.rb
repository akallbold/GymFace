require 'watir'
require 'webdrivers'

class Klass < ApplicationRecord
  has_many :user_klasses
  has_many :users, through: :user_klasses

  def self.fetchKlasses(date = Date.today.strftime("%Y-%m-%d"), location_id=110)
    # needs YYYY-MM-DD / YYYY-M-D format

    url = 'https://www.equinox.com/classschedule?clubs=' + location_id.to_s + "&date=" + date

    browser = Watir::Browser.new(:chrome)
    browser.goto(url)
    sleep 0.7
    page = Nokogiri::HTML(browser.html)
    # .search-result-row is the class of every item
    # .search-result-row.class-info provides the class info
    # => h2 has the class title
    # => .icon-time span has the time
    # => .icon-trainer span has the trainer
    # => .icon-marker span has the location

    klasses = page.css('.search-result-row .class-info')
    klasses.each do |klass|
      name = klass.css('h2').text.strip #class name

      time = klass.css('.icon-time').text.strip.split(" - ")
      start = date + " " + time.first
      ending = date + " " + time.last

      trainer = klass.css('.icon-trainer').text.strip #trainer

      Klass.find_or_create_by(name: name, instructor: trainer, start_time: start, end_time: ending, location_id: location_id)
    end

    browser.close
  end

  def self.class_by_date(date = Date.today)
    date.class == String ? date = Date.parse(date) : date
    return Klass.where(["start_time >= ? AND start_time <= ?", date, date + 1])
  end

end
