FactoryBot.define do
  factory :task do
    title { "Sample Task" }
    description { "This is a sample task description" }
    status { :todo }
    due_date { Date.today + 7.days }
    association :user
  end
end
