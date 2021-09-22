import './FilterCheckbox.css';

export default function FilterCheckbox(props) {
  const { isFirstSearch, setIsShortMovieOn } = props;

  function changeCheckbox(evt) {
    setIsShortMovieOn(evt.target.checked);
  }

  return (
    <div className="filter">
      <label className="filter__checkbox-container">
        <input id="filter-checkbox" name="filter-checkbox" className="filter__checkbox" type="checkbox" disabled={ isFirstSearch ? true : false } onChange={ changeCheckbox } />
        <span className="filter__slider"></span>
      </label>
    </div>
  )
}
