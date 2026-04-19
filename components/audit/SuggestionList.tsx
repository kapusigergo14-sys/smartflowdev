import type { Suggestion } from '@/lib/audit-types';
import styles from './SuggestionList.module.css';

interface Props {
  suggestions: Suggestion[];
}

const CATEGORY_ICON: Record<Suggestion['category'], string> = {
  conversion: '→',
  performance: '⚡',
  seo: '⌕',
  trust: '◆',
};

export default function SuggestionList({ suggestions }: Props) {
  return (
    <ol className={styles.list}>
      {suggestions.map((s, i) => (
        <li key={i} className={styles.item} data-impact={s.impact}>
          <div className={styles.num}>{i + 1}</div>
          <div className={styles.body}>
            <div className={styles.headerRow}>
              <h4 className={styles.title}>{s.title}</h4>
              <div className={styles.badges}>
                <span className={styles.impactBadge} data-impact={s.impact}>
                  {s.impact} impact
                </span>
                <span className={styles.catBadge}>
                  <span aria-hidden="true">{CATEGORY_ICON[s.category]}</span> {s.category}
                </span>
              </div>
            </div>
            <p className={styles.desc}>{s.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
