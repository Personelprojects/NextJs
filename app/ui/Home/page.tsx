import Link from "next/link";
// import Styles from "./globals.css"
import 'C:/Users/arunt/Documents/Projects/tailwindcss/AI/first/app/globals.css';

export default function Home(){
    return (
        <div>
            <div >
                <nav className="home-nav">
                    <div>
                        <Link href="../current_positions/" className="nav-link">Current Positions</Link>
                    </div>
                    <div>
                        <Link href="../Modify/" className="nav-link">Modify</Link>
                    </div>
                    <div>
                        <Link href="../History/" className="nav-link">History</Link>
                    </div>
                    <div>
                        <Link href="../Notes/" className="nav-link">Notes</Link>
                    </div>
                </nav>
            </div>
        </div>
    );
}