class KlassSerializer < ActiveModel::Serializer
  attributes :id, :name, :instructor, :start_time, :end_time, :location_id
end
