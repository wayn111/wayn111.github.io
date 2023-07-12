---
# 这是文章的标题
title: 我不允许还有人不知道SOLID原则
# 这是页面的图标
icon: fab fa-markdown
tag:
  - Markdown
# 这是侧边栏的顺序
order: 1
# 设置作者
author: waynaqua
# 设置写作时间
date: 2023-01-01
# 一个页面可以有多个分类
category:
  - 使用指南
# 一个页面可以有多个标签
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 这是测试显示的页脚
# 你可以自定义版权信息
copyright: 无版权
---

本文翻译自国外论坛 medium，原文地址：https://salithachathuranga94.medium.com/solid-principles-in-action-with-java-529d1c2b5f61

本文将带领大家学习在日常编程中如何使用 SOLID 原则。

![SOLID 原则在 Java 中的应用](https://files.mdnice.com/user/40549/53418472-f034-49df-a109-453e76af57d3.png)

如果你是一名优秀的编程人员，那么我要讨论的内容应该是一个众所周知的话题！废话不多说，让我们进入主题。

SOLID 原则由 Robert C. Martin 提出。它们是创建更易于维护、更易于理解和更灵活的软件代码的设计原则。这些经验法则帮助我们以更少的复杂性来编写我们的项目代码。SOLID 原则五个单词含义如下：

- 单一职责原则 (SRP) [ S ]
- 开闭原理 (OCP) [ O ]
- 里氏替换原理 (LSP) [ L ]
- 接口隔离原则 (ISP) [ I ]
- 依赖倒置原则 (DIP) [ D

现在我们用实际例子来一一列举。

# 单一职责原则（SRP）

**该原则规定每个 Java 类必须执行单一功能**。在这里单一功能意味着：类必须执行只属于该类的操作。

假设我们有一个名为 BankService 的类。在应用单一职责原则（SRP）之前会是这样的。存款、取款、发送通知、打印存折等所有操作均由 BankService 完成。这样 BankService 类就具有多个彼此不相关的职责。

```java
public class BankService {

    public void withdraw(double amount) {
        System.out.println("Withdraw money : " + amount);
    }

    public void deposit(double amount) {
        System.out.println("Deposit money : " + amount);
    }

    public String getLoanInfo(String loanType) {
        if (loanType.equals("professional")) {
            return "Professional Loan";
        } else if (loanType.equals("home")) {
            return "Home Loan";
        } else {
            return "Personal Loan";
        }
    }

    public void printPassbook() {
        System.out.println("Printing Book Details...");
    }

    public void sendOTP(String medium) {
        if (medium.equals("mobile")) {
            System.out.println("Sending OTP to mobile");
        } else if (medium.equals("email")) {
            System.out.println("Sending OTP to email");
        } else {
            System.out.println("Not a valid medium");
        }
    }

}
```

让我们将单一职责原则（SRP）应用于 BankService。我们可以将职责划分为多组服务。

```java
// BankService
public class BankService {
    public void withdraw(double amount) {
        System.out.println("Withdraw money : " + amount);
    }
    public void deposit(double amount) {
        System.out.println("Deposit money : " + amount);
    }
}
// LoanService
public class LoanService {
    public String getLoanInfo(String loanType) {
        if (loanType.equals("professional")) {
            return "Professional Loan";
        } else if (loanType.equals("home")) {
            return "Home Loan";
        } else {
            return "Personal Loan";
        }
    }
}
// PrinterService
public class PrinterService {
    public void printPassbook() {
        System.out.println("Printing Book Details...");
    }
}
// NotificationService
public class NotificationService {
    public void sendOTP(String medium) {
        if (medium.equals("mobile")) {
            System.out.println("Sending OTP to mobile");
        } else if (medium.equals("email")) {
            System.out.println("Sending OTP to email");
        } else {
            System.out.println("Not a valid medium");
        }
    }
}
```

现在你可以看到每个类都在执行自己的操作。这样代码看起来更加清晰易懂。这就是单一职责原则（SRP）的意义！

# 开闭原则（OCP）

**该原则规定，当有新需求到来，模块应该对扩展开放，对修改关闭**。这样我们应该就能够在现有代码的基础上添加扩展，而不改变原来的基本实现，这使得我们更容易扩展逻辑。

假设我们有一个名为 NotificationService 的服务可以向各种媒介发送通知。我们有两种发送 OTP 通知的方法。他们是手机和电子邮件。如果出现通过 WhatsApp 发送 OTP 通知的新要求，会发生什么情况。想象一下，我们应该做什么？我们只能修改原来 NotificationService 的代码！这就违反了开闭原则（OCP）！

让我们将开闭原则（OCP）应用到这个场景中。我将重新实现这个 NotificationService 类，准确来说 NotificationService 应该是一个接口。然后我将在另外 3 个服务中实现该接口，分别为 MobileNotificationService、EmailNotificationService 和 WhatsAppNotificationService。

```java
public interface NotificationService {
    void sendOTP(String medium);
    void sendTransactionHistory(String medium);
}
public class MobileNotificationService implements NotificationService {
    @Override
    public void sendOTP(String medium) {
        System.out.println("Sending OTP Number Message to: " + medium);
    }
    @Override
    public void sendTransactionHistory(String medium) {
        System.out.println("Sending Transactions Message to: " + medium);
    }
}
public class EmailNotificationService implements NotificationService {
    @Override
    public void sendOTP(String medium) {
        System.out.println("Sending OTP Number Email to: " + medium);
    }
    @Override
    public void sendTransactionHistory(String medium) {
        System.out.println("Sending Transactions Email to: " + medium);
    }
}
public class WhatsAppNotificationService implements NotificationService {
    @Override
    public void sendOTP(String medium) {
        System.out.println("Sending OTP Number to: " + medium);
    }
    @Override
    public void sendTransactionHistory(String medium) {
        System.out.println("Sending Transactions Details to: " + medium);
    }
}
```

如果我想发送所有 3 种类型的通知，我可以这样做。

![发送通知的客户端代码](https://files.mdnice.com/user/40549/c08558aa-f40d-4bfa-acb9-c76eb07f5585.png)

![客户端代码的结果](https://files.mdnice.com/user/40549/d27862d6-9ed5-45ac-8529-c72914c15a65.png)

如果又有另一种类型的新媒介需要发送那会发生什么？我们只需要创建另一个服务，从 NotificationService 实现它并完成与新媒介相关的逻辑就行！

这就是所有代码！我们已经成功应用开闭原则（OCP）。

# 里氏替换原则（LSP）

据说这是大多数开发人员最难理解的原则。这是由芭芭拉·利斯科夫（Barbara Liskov）介绍的。**它适用于继承，子类必须完全可替换其父类**。

> 如果类 A 是类 B 的子类型，那么我们应该能够在不中断程序行为的情况下用 A 替换 B。

让我们通过一个例子来理解这一点，但是我要提醒你，这个原则会让文章变得很长。🤔

假设我们要管理多种类型的社交媒体平台。它们是 Facebook、Instagram 和 WhatsApp。

![类层次结构的 UML 表示](https://files.mdnice.com/user/40549/89b0d168-57ad-4239-b211-b54b6119a6b2.png)

因此，SocialMedia 类有 3 个方法，分别称为 chat()、publish() 和 groupCall()。为了展现里氏替换原则（LSP）的作用，我将直接用 Facebook、Instagram、WhatsApp 3 个类来实现这一点。

```java
public abstract class SocialMedia {
    abstract void chat(String user);
    abstract void publish(Object post);
    abstract void groupCall(String... users);
}
public class Facebook extends SocialMedia {
    @Override
    void chat(String user) {

    }
    @Override
    void publish(Object post) {

    }
    @Override
    void groupCall(String... users) {

    }
}
public class Instagram extends SocialMedia {
    @Override
    void chat(String user) {

    }
    @Override
    void publish(Object post) {

    }
    @Override
    void groupCall(String... users) {

    }
}
public class WhatsApp extends SocialMedia {
    @Override
    void chat(String user) {

    }
    @Override
    void publish(Object post) {

    }
    @Override
    void groupCall(String... users) {

    }
}
```

SocialMedia 是一个抽象类，所有其他平台都是它的子类。预期的逻辑现已实现。那么这里出了什么问题呢？

> 你是否注意到，这样做的话，所有平台都必须实现这三个方法，即使该平台不支持此方法！让我解释一下
>
> Facebook：支持所有方法 chat()、publish() 和 groupCall()。
>
> WhatsApp：不支持发布帖子 publish()。
>
> Instagram：不支持群组通话 groupCall()。

所以在这种情况下，Instagram 或 WhatsApp 不能完全替代 SocialMedia 类！

现在让我们在这里应用里氏替换原则（LSP）。

```java
public interface SocialMedia {
     void chat(String user);
}
public interface PostManager {
    void publish(Object post);
}
public interface VideoCallManager {
    void groupCall(String... users);
}
public class Facebook implements SocialMedia, PostManager {
    @Override
    public void publish(Object post) {
        System.out.println("Publishing a post on Facebook: " + post);
    }
    @Override
    public void chat(String user) {
        System.out.println("Chatting on Facebook with: " + user);
    }
}
public class WhatsApp implements SocialMedia, VideoCallManager {
    @Override
    public void chat(String user) {
        System.out.println("Chatting on WhatsApp with: " + user);
    }
    @Override
    public void groupCall(String... users) {
        System.out.println("Taking a Group Call on WhatsApp with: " + Arrays.toString(users));
    }
}
```

你现在可以看到 SocialMedia 是一个具有单一职责的接口，包含 chat() 方法。因此我们有单独的界面来管理视频通话和发布帖子。这样所有子类：Facebook 和 WhatsApp 都会执行它们只能执行的操作！

- WhatsApp 是 SocialMedia 和 VideoCallManager 的子类
- Facebook 是 SocialMedia 和 PostManager 的子类

让我们检查一下定义：

> 如果 WhatsApp 类是 SocialMedia 类的子类，那么我们应该能够在不中断程序行为的情况下用 WhatsApp 替换 SocialMedia。

![测试LSP的客户端代码](https://files.mdnice.com/user/40549/f19f239f-d458-4a99-a71f-9890aec84c0c.png)

![LSP客户端代码的结果](https://files.mdnice.com/user/40549/09c97675-a277-43bd-8650-318142646fd8.png)

这就是里氏替换原则（LSP）的全部内容！！！讲解完了！

# 接口隔离原则（ISP）

该原则指出较大的接口分为较小的接口。因为**实现类只使用需要的方法，我们不应该强迫客户使用他们不想使用的方法**。

这也有点类似于单一责任原则。正确的应用程序设计和正确的抽象是接口隔离原则背后的关键。

让我们举个例子。

我们有一个支付接口来代表所有类型的支付。 BankPayment 和 LoanPayment 是 Payment 中实现类。

```java
public interface Payment {
    void init();
    Object status();
    List<Object> getPayments();
}
public class LoanPayment implements Payment {
    @Override
    public void init() {
        System.out.println("Initiate LoanPayment...");
    }
    @Override
    public Object status() {
        return "LoanPayment Status";
    }
    @Override
    public List<Object> getPayments() {
        return Arrays.asList("LoanPayment1", "LoanPayment2");
    }
}
public class BankPayment implements Payment {
    @Override
    public void init() {
        System.out.println("Initiate BankPayment...");
    }
    @Override
    public Object status() {
        return "BankPayment Status";
    }
    @Override
    public List<Object> getPayments() {
        return Arrays.asList("BankPayment1", "BankPayment2");
    }
}
```

想象一下，我们收到一个新要求，需要向 Payment 接口添加一个方法。但是实际上这个方法只有 LoanPayment 类需要持有。那么我们就得修改 Payment 接口了。除了修改 LoanPayment 我们还得修改 BankPayment 类，因为 BankPayment 也实现了 Payment 接口。

新方法将返回付款期限：贷款 => 10 年

```java
public interface Payment {
    void init();
    Object status();
    List<Object> getPayments();
    int getTimePeriod();
}
public class LoanPayment implements Payment {
    @Override
    public void init() {
        System.out.println("Initiate LoanPayment...");
    }
    @Override
    public Object status() {
        return "LoanPayment Status";
    }
    @Override
    public List<Object> getPayments() {
        return Arrays.asList("LoanPayment1", "LoanPayment2");
    }
    public int getTimePeriod() {
        return 10;
    }
}
public class BankPayment implements Payment {
    @Override
    public void init() {
        System.out.println("Initiate BankPayment...");
    }
    @Override
    public Object status() {
        return "BankPayment Status";
    }
    @Override
    public List<Object> getPayments() {
        return Arrays.asList("BankPayment1", "BankPayment2");
    }
    // not needed for BankPayment but we have to override
    public int getTimePeriod() {
        retun 0;
    }
}
```

这样做不好。在这种情况下，一开始的代码设计就很重要了！让我们尝试在这里应用接口隔离原则（ISP）。

```java
public interface Payment {
    void init();
    Object status();
    List<Object> getPayments();
}
public interface Loan extends Payment {
    int getTimePeriod();
}
public interface Bank extends Payment {
    int getOutstandingBalance();
}
public class LoanPayment implements Loan {
    @Override
    public int getTimePeriod() {
        return 10;
    }
    @Override
    public void init() {
        System.out.println("Initiate LoanPayment...");
    }
    @Override
    public Object status() {
        return "LoanPayment Status";
    }
    @Override
    public List<Object> getPayments() {
        return Arrays.asList("LoanPayment1", "LoanPayment2");
    }
}
public class BankPayment implements Bank {
    @Override
    public int getOutstandingBalance() {
        return 1000;
    }
    @Override
    public void init() {
        System.out.println("Initiate BankPayment...");
    }
    @Override
    public Object status() {
        return "BankPayment Status";
    }
    @Override
    public List<Object> getPayments() {
        return Arrays.asList("BankPayment1", "BankPayment2");
    }
}
```

这就是设计如何让我们的代码变得更好！我们已经彻底摆脱了 ISP 的困扰。我们使用了更多的接口，并全面地划分了职责。

> 如果出现与银行支付相关的新要求会怎样？
>
> 我们只需要修改 Bank 接口并在 BankPayment 类中重写它，不会影响其他类！

# 依赖倒置原则（DIP）

该原则指出我们必须使用抽象（抽象类和接口）而不是具体实现。**高层模块不应该依赖于低层模块，两者都应该依赖于抽象**。

让我在这里用另一个例子来解释。

假设我们要创建一个购物场景，我们需要信用卡或借记卡来购买物品，让我们创建它们并进行购买！

```java
public class CreditCard {
    public void doTransaction(double amount) {
        System.out.println("Transaction with CreditCard: " + amount);
    }
}
public class DebitCard {
    public void doTransaction(double amount) {
        System.out.println("Transaction with DebitCard: " + amount);
    }
}
```

商场场景

```java
public class ShoppingMall {

    private DebitCard debitCard;

    public ShoppingMall(DebitCard debitCard) {
        this.debitCard = debitCard;
    }

    public void purchase(double amount) {
        this.debitCard.doTransaction(amount);
    }

    public static void main(String[] args) {
        DebitCard debitCard = new DebitCard();
        ShoppingMall shoppingMall = new ShoppingMall(debitCard);
        shoppingMall.purchase(10000);
    }
}
```

你可以在这里看到，DebitCard 作为 ShoppingMall 类的依赖项紧密耦合。我们需要它来执行购买。那么如果有人没有借记卡会怎样？但他/她有信用卡！现在我们再次必须更改 ShoppingMall 类并绑定信用卡而不是借记卡。（代码设计很重要！）

让我们将依赖倒置原则（DIP）应用到购物中心 ShoppingMall。

```java
public interface BankCard {
    void doTransaction(double amount);
}
public class DebitCard implements BankCard {
    @Override
    public void doTransaction(double amount) {
        System.out.println("Transaction with DebitCard: " + amount);
    }
}
public class CreditCard implements BankCard {
    @Override
    public void doTransaction(double amount) {
        System.out.println("Transaction with CreditCard: " + amount);
    }
}
```

我们引入了一个接口作为两张卡的父级，一个 BankCard 接口。我们的新购物中心现在将能够使用任何银行卡，而不是与特定的卡类型紧密结合！请参阅下面的客户端代码。

```java
public class ShoppingMall {

    private BankCard bankCard;

    public ShoppingMall(BankCard bankCard) {
        this.bankCard = bankCard;
    }

    public void purchase(double amount) {
        this.bankCard.doTransaction(amount);
    }

    public static void main(String[] args) {
        BankCard bankCard1 = new DebitCard();
        BankCard bankCard2 = new CreditCard();
        ShoppingMall shoppingMall = new ShoppingMall(bankCard1);
        // ShoppingMall shoppingMall = new ShoppingMall(bankCard2);
        shoppingMall.purchase(10000);
    }
}
```

ShoppingMall 现在接受任何卡作为其依赖项。就这样我们实现了最后一个依赖倒置原则（DIP）。

# 总结

我希望本文我举的例子能够被大家理解，因为我尝试用熟悉的场景来讲解它们。当我第一次读到 SOLID 原则时，它对我来说也像希腊语（很难理解）。但后来我渐渐地理解了他们，我把我理解这些概念的方式也写在这里，所以这篇文章的内容非常丰富。最后，感谢大家阅读。
