import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import {
  selectAllChecked,
  selectFilters,
  toggleFilter,
  toggleAll,
  uncheckAllFilters,
} from '../../redux/slices/filterSlice'

import styles from './Filter.module.scss'

function Filter() {
  const dispatch = useDispatch()
  const allChecked = useSelector(selectAllChecked)
  const filters = useSelector(selectFilters)

  const handleCheckboxChange = (filterName) => {
    dispatch(toggleFilter(filterName))
    if (allChecked) {
      dispatch(uncheckAllFilters())
    }
  }

  const handleAllCheckboxChange = () => {
    dispatch(toggleAll())
  }

  return (
    <aside className={styles.aside}>
      <div className={styles.filterDesc}>
        <span>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
      </div>
      <div className={styles.filterLabels}>
        <div className={styles.filterLabelWrap}>
          <label htmlFor="all" className={styles.filterLabel}>
            <input
              type="checkbox"
              id="all"
              checked={allChecked}
              onChange={handleAllCheckboxChange}
              className={styles.filterInput}
            />
            <span className={styles.filterCustomCheckbox} />
            <span className={styles.filterText}>Все</span>
          </label>
        </div>

        <div className={styles.filterLabelWrap}>
          <label htmlFor="0" className={styles.filterLabel}>
            <input
              type="checkbox"
              id="0"
              checked={filters.noStops}
              onChange={() => handleCheckboxChange('noStops')}
              className={styles.filterInput}
            />
            <span className={styles.filterText}>Без пересадок</span>
          </label>
          <label htmlFor="1" className={styles.filterLabel}>
            <input
              type="checkbox"
              id="1"
              checked={filters.oneStop}
              onChange={() => handleCheckboxChange('oneStop')}
              className={styles.filterInput}
            />
            <span className={styles.filterText}>1 пересадка</span>
          </label>
        </div>

        <div className={styles.filterLabelWrap}>
          <label htmlFor="2" className={styles.filterLabel}>
            <input
              type="checkbox"
              id="2"
              checked={filters.twoStops}
              onChange={() => handleCheckboxChange('twoStops')}
              className={styles.filterInput}
            />
            <span className={styles.filterText}>2 пересадки</span>
          </label>
          <label htmlFor="3" className={styles.filterLabel}>
            <input
              type="checkbox"
              id="3"
              checked={filters.threeStops}
              onChange={() => handleCheckboxChange('threeStops')}
              className={styles.filterInput}
            />
            <span className={styles.filterText}>3 пересадки</span>
          </label>
        </div>
      </div>
    </aside>
  )
}

export default Filter
