import { useShapeStore } from '@/store'
import styles from './Settings.module.css'
import type { IShapeDisplayConfig } from '@/types'
export const Settings = () => {
	const {changeDisplayConfig,displayConfig} = useShapeStore()

	const handleChangeConfig = (field:keyof IShapeDisplayConfig,value:boolean) => {
		changeDisplayConfig({[field]:value})
		
	}
	return <aside className={styles.settings_container}>
		<div className={styles.settings_popup_container}>
			<p>Настройки</p>
			<div className={styles.settings_popup}>
				<div>
					<input style={{cursor:'pointer'}}  type='checkbox' id='layers' onChange={(e) => handleChangeConfig('showLayer',e.target.checked)} name='layers' checked={displayConfig.showLayer ?? false} />
				<label style={{cursor:'pointer'}} htmlFor='layers'>Показать уровень слоя фигуры</label>
				</div>
			</div>
		</div>
	</aside>
}