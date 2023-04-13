/**
 * 实现一个 arrange 函数，可以进行时间和工作调度
 * 注意，这里的 wait do waitFirst 均可以无限调用
 * 其中 exeute 为 async 函数
 * 除了 arrange 和 execute 之外的其他函数都可以无限次调用
 * wait 和 waitFirst 没有输出，但是会等待对应的时间继续执行后续的操作
 * 调用 execute 之前不会有任何输出
 *
 * --- 说明 ---
 *
 * - 具体功能参考下列示例
 * - 在示例中调用到的方法都需要实现
 * - 下面示例中 `>` 表示在控制台中输出 (console.log)
 *
 * --- 示例 ---
 *
 * 示例一:
 * `arrange('William').execute();`
 * > William is notified
 *
 * 示例二:
 * `arrange('William').wait(5).do('commit').wait(5).do('push').execute();`
 * > William is notified
 * 等待 5s
 * > Start to commit
 * 等待 5s
 * > Start to push
 *
 * 示例三:
 * `arrange('William').waitFirst(3).do('push').waitFirst(3).execute();`
 * 等待 3s...
 * > William is notified
 * 等待 3s...
 * > Start to push
 *
 */

function arrange(name) {
  const queue = [];

  queue.push(() => console.log(`${name} is notified`));

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms * 1000);
    });
  }

  function waitFirst(delay) {
    queue.unshift(() => sleep(delay));
    return this;
  }

  function wait(delay) {
    queue.push(() => sleep(delay));
    return this;
  }

  function doSomething(action) {
    queue.push(() => console.log(`Start to ${action}`));
    return this;
  }

  async function execute() {
    for (const task of queue) {
      await task();
    }
  }

  return {
    waitFirst,
    wait,
    do: doSomething,
    execute,
  };
}

// arrange("William").execute();
// arrange("William").wait(5).do("commit").wait(5).do("push").execute();
// arrange("William").waitFirst(3).do("push").waitFirst(3).execute();
