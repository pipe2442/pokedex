require 'rails_helper'

RSpec.describe Task, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:title) }
    
    it 'is invalid without a user' do
      task = build(:task, user: nil)
      expect(task).not_to be_valid
      expect(task.errors[:user]).to include('must exist')
    end

    it 'is valid with a todo status' do
      task = build(:task, status: :todo)
      expect(task).to be_valid
    end

    it 'is valid with an in_progress status' do
      task = build(:task, status: :in_progress)
      expect(task).to be_valid
    end

    it 'is valid with a done status' do
      task = build(:task, status: :done)
      expect(task).to be_valid
    end

    it 'is invalid with an invalid status' do
      expect {
        build(:task, status: :invalid_status)
      }.to raise_error(ArgumentError, "'invalid_status' is not a valid status")
    end
  end

  describe 'defaults' do
    it 'defaults status to todo' do
      task = Task.new
      expect(task.status).to eq('todo')
    end
  end

  describe 'due_date' do
    it 'allows a valid date' do
      task = build(:task, due_date: Date.today)
      expect(task).to be_valid
    end

    it 'allows nil due_date' do
      task = build(:task, due_date: nil)
      expect(task).to be_valid
    end

    it 'handles date types correctly' do
      task = build(:task, due_date: '2026-01-12')
      expect(task.due_date).to be_a(Date)
    end
  end
end
