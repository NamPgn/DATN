import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumb.module.css";
import { URLSECTION } from "../../constant";

const Breadcrumb = () => {
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter((x) => x);

	if (location.pathname === "/") {
		return null;
	}

	const getTitleFromPath = (path: string) => {
		const section = URLSECTION.find(section => section.PATH === `/${path}`);
		if (section) return section.SECTTIONTITLE;

		return path.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
	};

	return (
		<nav className={styles.breadcrumb + " container"} style={{
			marginTop: "8rem"
		}}>
			<ol className={styles.breadcrumbList}>
				<li className={styles.breadcrumbItem}>
					<Link to="/" className={styles.breadcrumbLink}>
						Trang chủ
					</Link>
				</li>
				{pathnames.map((name, index) => {
					const isLast = index === pathnames.length - 1;
					const title = getTitleFromPath(name);

					return (
						<li key={name} className={styles.breadcrumbItem}>
							{isLast ? (
								<span className={styles.breadcrumbText}>
									{title}
								</span>
							) : (
								<div className={styles.breadcrumbLink}>
									{title}
								</div>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
};

export default Breadcrumb; 