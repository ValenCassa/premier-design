import { useCommand } from "hooks/useCommand";
import Command from "public/svg/Command.svg";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import styles from "./styles/CommandButton.module.css";
import Search from "public/svg/Search.svg";
import { ideasItems } from "config/ideas";
import ArrowModal from "public/svg/ArrowModal.svg";
import TwitterIcon from "public/svg/Twitter.svg";
import LinkedInIcon from "public/svg/LinkedIn.svg";
import GithubIcon from "public/svg/Github.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useOutsideRef } from "hooks/useOutsideRef";
import PortfolioIcon from "public/svg/Portfolio.svg";

const linksVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

interface ModalLinkProps {
  icon: React.ReactNode;
  title: string;
  active: boolean;
  href: string;
  onMouseEnter: () => void;
}

const links = ideasItems
  .sort(
    (a, b) =>
      new Date(b.date as string).valueOf() -
      new Date(a.date as string).valueOf()
  )
  .slice(0, 3)
  .map((item) => ({
    icon: <ArrowModal />,
    title: item.title,
    href: item.href,
  }));

const linksSocial = [
  {
    icon: <TwitterIcon />,
    title: "Twitter",
    href: "https://twitter.com/devcassa",
  },
  {
    icon: <LinkedInIcon />,
    title: "Linkedin",
    href: "https://www.linkedin.com/in/valentin-cassarino/",
  },
  {
    icon: <GithubIcon />,
    title: "Github",
    href: "https://github.com/ValenCassa",
  },
  {
    icon: <PortfolioIcon />,
    title: "Portfolio",
    href: "https://valencassa.dev",
  },
];

const ModalLink = ({
  icon,
  title,
  active,
  href,
  onMouseEnter,
}: ModalLinkProps) => {
  const { push } = useRouter();
  const { setIsOpen } = useCommand();

  const onLink = () => {
    setIsOpen(false);
    if (href.includes("http")) {
      window.open(href, "_blank");
    } else {
      push(`/ideas/${href}`);
    }
  };

  const handleClick = () => {
    onLink();
  };

  useHotkeys(
    "*",
    (event, handler) => {
      if (active) {
        if (event.key === "Enter") {
          onLink();
        }
      }
    },
    undefined,
    [active]
  );

  return (
    <div
      className={styles.linkcontainer}
      onMouseEnter={onMouseEnter}
      onClick={handleClick}
      id={!active ? styles.inactive : undefined}
    >
      {active ? (
        <motion.div
          className={styles.activeBackground}
          layoutId="modalActiveLink"
        />
      ) : null}

      <div className={styles.ideasLink}>
        <span className={styles.linkTitle}>{icon}</span>
        <p className={styles.linkTitle}>{title}</p>
      </div>
    </div>
  );
};

const MainLinks = ({
  command,
  setCommand,
}: {
  command: number | null;
  setCommand: Dispatch<SetStateAction<number | null>>;
}) => {
  return (
    <motion.div
      className={styles.mainLinks}
      variants={linksVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <p className={styles.titleLinks}>Recent ideas</p>
      {links.map((link, index) => (
        <ModalLink
          icon={link.icon}
          title={link.title}
          key={index}
          active={command === index}
          href={link.href}
          onMouseEnter={() => {
            setCommand(index);
          }}
        />
      ))}

      <p className={styles.titleLinks}>Find me</p>
      <div className={styles.socials}>
        {linksSocial.map((link, index) => (
          <ModalLink
            icon={link.icon}
            title={link.title}
            key={index}
            active={command === index + links.length}
            href={link.href}
            onMouseEnter={() => {
              setCommand(index + links.length);
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export const CommandModal = () => {
  const [value, setValue] = useState<string>("");
  const [command, setCommand] = useState<number | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const { setIsOpen } = useCommand();
  const modalRef = useRef<HTMLDivElement>(null);

  const increment = () => {
    if (command === null) {
      setCommand(0);
    } else {
      const filterCondition =
        (command as number) + 1 >
        links.filter((link) =>
          link.title.toLowerCase().includes(value.toLowerCase())
        ).length -
          1;
      const notFitlerCondition =
        (command as number) + 1 > links.length + linksSocial.length - 1;
      const condition = value.length > 0 ? filterCondition : notFitlerCondition;

      setCommand(condition ? 0 : (command as number) + 1);
    }
  };

  const decrement = () => {
    if (command === null) {
      setCommand(0);
    } else {
      const filterCondition =
        links.filter((link) =>
          link.title.toLowerCase().includes(value.toLowerCase())
        ).length - 1;
      const notFitlerCondition = links.length + linksSocial.length - 1;
      const condition = value ? filterCondition : notFitlerCondition;

      setCommand(
        (command as number) - 1 < 0 ? condition : (command as number) - 1
      );
    }
  };

  useHotkeys(
    "*",
    (event, handler) => {
      if (event.key === "ArrowDown") increment();
      if (event.key === "ArrowUp") decrement();
    },
    { enableOnTags: ["INPUT"] },
    [command, value]
  );

  useHotkeys("ctrl+i", () => {
    searchRef.current?.focus();
  });

  useHotkeys(
    "esc",
    () => {
      if (document.activeElement === searchRef.current) {
        searchRef.current?.blur();
      } else {
        setIsOpen(false);
      }
    },
    {
      enableOnTags: ["INPUT"],
    }
  );

  useOutsideRef(modalRef, setIsOpen);

  return (
    <motion.div
      className={styles.container}
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
        },
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div
        className={styles.modal}
        ref={modalRef}
        initial={{
          scale: 0.8,
        }}
        animate={{
          scale: 1,
        }}
      >
        <div className={styles.searchbar}>
          <label className={styles.search}>
            <Search />
            <p style={{ opacity: value ? "0" : "1" }}>Search...</p>
          </label>
          <label className={styles.commandText}>
            <Command />
            <p>i</p>
          </label>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={searchRef}
          />
        </div>
        <div className={styles.results}>
          <AnimatePresence initial exitBeforeEnter>
            {value ? (
              <motion.div
                className={styles.mainLinks}
                variants={linksVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {ideasItems
                  .filter((item) =>
                    item.title.toLowerCase().includes(value.toLowerCase())
                  )
                  .map((item, index) => (
                    <ModalLink
                      icon={<ArrowModal />}
                      title={item.title}
                      key={index}
                      active={command === index}
                      href={item.href}
                      onMouseEnter={() => {
                        setCommand(index);
                      }}
                    />
                  ))}
              </motion.div>
            ) : (
              <MainLinks command={command} setCommand={setCommand} />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const CommandModalComponent = () => {
  const { isOpen } = useCommand();
  return (
    <AnimatePresence initial exitBeforeEnter>
      {isOpen && <CommandModal />}
    </AnimatePresence>
  );
};

const CommandButton = () => {
  const { setIsOpen, isOpen } = useCommand();

  useHotkeys(
    "ctrl+q",
    () => {
      setIsOpen(!isOpen);
    },
    undefined,
    [isOpen]
  );

  return (
    <>
      <div className={styles.command}>
        <button
          className={styles.commandButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Command />
        </button>
      </div>
    </>
  );
};

export default CommandButton;
