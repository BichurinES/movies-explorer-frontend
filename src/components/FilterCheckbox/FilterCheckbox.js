import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <div className="filter">
      <label className="filter__checkbox-container">
        <input id="filter-checkbox" name="filter-checkbox" className="filter__checkbox" type="checkbox" />
        <span className="filter__slider"></span>
      </label>
    </div>
  )
}
