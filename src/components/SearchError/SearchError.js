import './SearchError.css';

export default function SearchError(props) {
  const { isSearchErrorVisible, errorText } = props;

  return (
    <div className={ `searchError ${ isSearchErrorVisible ? 'searchError_visible' : '' }` }>
      <h1 className="searchError__title">{ errorText }</h1>
    </div>
  )
}
